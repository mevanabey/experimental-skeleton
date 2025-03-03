"use client";

import React, { useState } from 'react';
import { MapForm } from '../maps/location-map';
import mapboxgl from 'mapbox-gl';
import { LocateFixedIcon } from 'lucide-react';
import { SpeechRecorder } from './speech-recorder';
import processTranscription from '../../services/transcription-processor';

interface FormField {
  label: string;
  name: string;
  type: string;
  isSkippable: boolean;
  options?: string[];
  isMultiSelect?: boolean;
}

interface Victim {
  id: string;
  age: string;
  gender: string;
  raceEthnicity: string;
  religion: string;
  educationLevel: string;
  incomeLevel: string;
}

interface FormValues {
  [key: string]: string | string[] | { lat: number; lng: number } | { date: string; time: string };
}

const incidentFields: FormField[] = [
  {
    label: 'Consent Form',
    name: 'consent',
    type: 'consent',
    isSkippable: false,
  },
  {
    label: 'Voice Description',
    name: 'voiceDescription',
    type: 'speech',
    isSkippable: true,
  },
  {
    label: 'Incident Category',
    name: 'incidentCategory',
    type: 'select',
    isSkippable: false,
    options: ['Hate Incident', 'Crime Incident', 'Domestic Extremism', 'Election Related', 'Other'],
  },  
  {
    label: 'Type of Incident',
    name: 'incidentType',
    type: 'select',
    isSkippable: false,
    options: [
      'Physical Assault',
      'Verbal Harassment',
      'Property Vandalism',
      'Threats and Intimidation',
      'Online Harassment',
      'Distribution of Hate Material',
      'Discrimination',
      'Graffiti or Symbolic Vandalism',
      'Social Media Hate Speech',
      'Arson',
      'Trespassing',
      'Other'
    ],
  },
  {
    label: 'Specific Incident Type',
    name: 'specificIncidentType',
    type: 'select',
    isSkippable: false,
    isMultiSelect: true,
    options: [
      'Assault with Weapon', 
      'Assault without Weapon', 
      'Verbal Abuse', 
      'Slurs', 
      'Intimidation', 
      'Harassment', 
      'Vandalism', 
      'Graffiti', 
      'Property Damage', 
      'Online Harassment', 
      'Doxxing', 
      'Stalking', 
      'Discrimination in Services', 
      'Workplace Discrimination', 
      'Housing Discrimination'
    ],
  },
  {
    label: 'Nature of Incident',
    name: 'natureOfIncident',
    type: 'select',
    isSkippable: false,
    isMultiSelect: true,
    options: [
      'Racially Motivated', 
      'Religious Bias', 
      'Gender-Based', 
      'Sexual Orientation', 
      'Disability-Related', 
      'Ethnicity/National Origin', 
      'Political Affiliation', 
      'Immigration Status', 
      'Age-Related', 
      'Socioeconomic Status'
    ],
  },
  {
    label: 'When Did This Happen?',
    name: 'incidentDateTime',
    type: 'datetime',
    isSkippable: false,
  },
  {
    label: 'Incident Location',
    name: 'incidentLocation',
    type: 'location',
    isSkippable: false,
  },
  {
    label: 'Incident Description',
    name: 'description',
    type: 'description',
    isSkippable: true,
  },
  {
    label: 'Approximate Number of Victims',
    name: 'victimCount',
    type: 'select',
    isSkippable: false,
    options: ['1', '2-5', '6-10', '11-20', '21-50', '50+', 'Unknown'],
  },
  {
    label: 'Victim Information',
    name: 'victimInformation',
    type: 'victims',
    isSkippable: true,
  },
];

// Options for victim fields
const victimOptions = {
  age: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Unknown'],
  gender: ['Male', 'Female', 'Non-binary', 'Transgender', 'Other', 'Unknown'],
  raceEthnicity: ['White', 'Black or African American', 'Hispanic or Latino', 'Asian', 'Native American', 'Pacific Islander', 'Middle Eastern', 'Mixed Race', 'Other', 'Unknown'],
  religion: ['Christianity', 'Islam', 'Judaism', 'Hinduism', 'Buddhism', 'Sikhism', 'Atheism/Agnosticism', 'Other', 'Unknown'],
  educationLevel: ['Less than High School', 'High School', 'Some College', 'Associate Degree', 'Bachelor\'s Degree', 'Graduate Degree', 'Unknown'],
  incomeLevel: ['Under $25,000', '$25,000-$49,999', '$50,000-$74,999', '$75,000-$99,999', '$100,000+', 'Unknown']
};

export const IncidentForm = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [victims, setVictims] = useState<Victim[]>([]);
  const [currentVictim, setCurrentVictim] = useState<Victim | null>(null);
  const [currentVictimField, setCurrentVictimField] = useState<string>('');
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [description, setDescription] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isProcessingTranscription, setIsProcessingTranscription] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);

  // Add environment variables for API keys
  const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || '';
  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

  const handleConsent = (consent: boolean) => {
    setHasConsent(consent);
    if (consent && currentStep === 0) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (name: string, value: string) => {
    const currentField = incidentFields[currentStep];
    
    if (currentField.isMultiSelect) {
      // For multi-select fields, toggle the selection
      setFormValues((prev) => {
        const currentValues = prev[name] as string[] || [];
        if (currentValues.includes(value)) {
          return { ...prev, [name]: currentValues.filter(v => v !== value) };
        } else {
          return { ...prev, [name]: [...currentValues, value] };
        }
      });
    } else {
      // For single-select fields
      const currentValue = formValues[name];
      setFormValues((prev) => ({ ...prev, [name]: value }));
      
      // If this is a manual selection (either selecting a new value or reselecting the same value)
      // automatically move to the next step
      if (currentStep < incidentFields.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleMultiSelectContinue = () => {
    if (currentStep < incidentFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLocationSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationSearch(value);
    
    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        if (data.features) {
          setLocationSuggestions(data.features);
        }
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setLocationSuggestions([]);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectLocation = (suggestion: any) => {
    setFormValues((prev) => ({ 
      ...prev, 
      incidentLocation: suggestion.place_name,
      locationCoordinates: {
        lat: suggestion.geometry.coordinates[1],
        lng: suggestion.geometry.coordinates[0]
      }
    }));
    setLocationSearch(suggestion.place_name);
    setLocationSuggestions([]);
    setCoordinates({
      lat: suggestion.geometry.coordinates[1],
      lng: suggestion.geometry.coordinates[0]
    });
  };

  const handleCoordinatesUpdate = (coords: { lat: number; lng: number }, locationName: string) => {
    setFormValues((prev) => ({ 
      ...prev, 
      incidentLocation: locationName,
      locationCoordinates: coords
    }));
    setLocationSearch(locationName);
    setCoordinates(coords);
  };

  const handleSkip = () => {
    const currentField = incidentFields[currentStep];
    if (currentField.isSkippable) {
      if (currentStep < incidentFields.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentVictimField) {
      // If we're in a victim sub-field, go back to victim selection
      setCurrentVictimField('');
    } else if (currentVictim) {
      // If we're adding/editing a victim, go back to victims list
      setCurrentVictim(null);
    } else if (currentStep > 0) {
      // Otherwise go back to previous step
      setCurrentStep(currentStep - 1);
    }
  };

  const addNewVictim = () => {
    const newVictim: Victim = {
      id: Date.now().toString(),
      age: '',
      gender: '',
      raceEthnicity: '',
      religion: '',
      educationLevel: '',
      incomeLevel: ''
    };
    setCurrentVictim(newVictim);
  };

  const editVictim = (victimId: string) => {
    const victim = victims.find(v => v.id === victimId);
    if (victim) {
      setCurrentVictim({...victim});
    }
  };

  const deleteVictim = (victimId: string) => {
    setVictims(victims.filter(v => v.id !== victimId));
  };

  const selectVictimField = (fieldName: string) => {
    setCurrentVictimField(fieldName);
  };

  const handleVictimFieldSelect = (fieldName: string, value: string) => {
    if (currentVictim) {
      const updatedVictim = { ...currentVictim, [fieldName]: value };
      setCurrentVictim(updatedVictim);
      setCurrentVictimField('');
      
      // Check if all fields are filled
      const allFieldsFilled = Object.entries(updatedVictim)
        .filter(([key]) => key !== 'id')
        .every(([_, value]) => value !== '');
      
      // If all fields are filled, save the victim
      if (allFieldsFilled) {
        saveVictim(updatedVictim);
      }
    }
  };

  const saveVictim = (victim: Victim) => {
    const existingIndex = victims.findIndex(v => v.id === victim.id);
    
    if (existingIndex >= 0) {
      // Update existing victim
      const updatedVictims = [...victims];
      updatedVictims[existingIndex] = victim;
      setVictims(updatedVictims);
    } else {
      // Add new victim
      setVictims([...victims, victim]);
    }
    
    setCurrentVictim(null);
  };

  const continueToNextStep = () => {
    if (currentStep < incidentFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleDateTimeSelect = () => {
    setFormValues((prev) => ({
      ...prev,
      incidentDateTime: { date: selectedDate, time: selectedTime }
    }));
    if (currentStep < incidentFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleTranscriptionComplete = async (transcription: string) => {
    setTranscribedText(transcription);
    setIsProcessingTranscription(true);

    try {
      const extractedData = await processTranscription(transcription, openaiApiKey);
      
      // Update form values with extracted data
      setFormValues((prev) => ({
        ...prev,
        description: extractedData.correctedTranscription || transcription,
        incidentCategory: extractedData.incidentCategory || prev.incidentCategory,
        incidentType: extractedData.incidentType || prev.incidentType,
        specificIncidentType: extractedData.specificIncidentType || prev.specificIncidentType,
        natureOfIncident: extractedData.natureOfIncident || prev.natureOfIncident,
        victimCount: extractedData.victimCount || prev.victimCount,
      }));

      // Set description text using corrected transcription
      setDescription(extractedData.correctedTranscription || transcription);

      // Simply move to the next step
      if (currentStep < incidentFields.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Error processing transcription:', error);
      // In case of error, use the original transcription
      setDescription(transcription);
      setFormValues((prev) => ({
        ...prev,
        description: transcription
      }));
    } finally {
      setIsProcessingTranscription(false);
    }
  };

  const handleSpeechStateChange = (recording: boolean, processing: boolean) => {
    setIsRecording(recording);
    setIsProcessingAudio(processing);
  };

  const currentField = incidentFields[currentStep];
  const progress = Math.round(((currentStep + 1) / incidentFields.length) * 100);

  // Update the showContinueButton logic
  const showContinueButton = 
    currentField.type === 'consent' ||
    (currentField.type === 'select' && (
      currentField.isMultiSelect 
        ? (formValues[currentField.name] as string[] || []).length > 0
        : Boolean(formValues[currentField.name])
    )) ||
    (currentField.type === 'victims' && currentVictim === null) ||
    (currentField.type === 'location' && locationSearch) ||
    currentField.type === 'description' ||
    currentField.type === 'datetime' ||
    (currentField.type === 'speech' && !isProcessingAudio && !isProcessingTranscription);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    setFormValues((prev) => ({ ...prev, description: value }));
  };

  // Determine what to render based on current state
  let content;
  if (currentField.type === 'consent') {
    content = (
      <div className="w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Consent Form
          </h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for choosing to report your experience to TrustNet360. We recognize the courage it
              takes to share your story, and we are committed to protecting your privacy and ensuring your
              safety.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Confidentiality and Data Protection
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Your personal information and report will be kept confidential and securely stored.</li>
              <li>You may choose to report anonymously. If you provide identifying details, they will only
                be used for follow-up purposes with your consent.</li>
              <li>TrustNet360 will never share your personal information with law enforcement,
                government agencies, or any third party without your explicit permission, except where
                legally required (e.g., cases involving imminent harm or legal mandates).</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              How Your Information is Used
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Your report helps us track and analyze hate incidents to provide better support services
                and advocacy for affected communities.</li>
              <li>We may use de-identified and aggregated data for research, policy advocacy, and public
                reporting to combat hate and improve community safety.</li>
              <li>If you choose, we can connect you with victim support services, legal assistance, or
                community-based organizations for further help.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Your Rights
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>You have the right to decide what information to share and can withdraw your consent at
                any time.</li>
              <li>You may request access to your submitted report, ask for corrections, or request
                deletion of your personal data.</li>
              <li>Your participation is entirely voluntary, and you can stop at any time without any
                consequences.</li>
            </ul>

            <div className="mt-8 text-xs text-center text-gray-500 dark:text-gray-400">
              If you have any questions about data privacy or how your report will be used, please contact
              <a href="mailto:support@trustnet360.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                TrustNet360 Support
              </a>.
            </div>
          </div>

          {hasConsent === false && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-center">
                We cannot proceed with your report without your consent. If you have concerns, please contact our support team for assistance.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } else if (currentField.type === 'speech') {
    content = (
      <SpeechRecorder
        onTranscriptionComplete={handleTranscriptionComplete}
        apiKey={deepgramApiKey}
        onStateChange={handleSpeechStateChange}
      />
    );
  } else if (!hasConsent) {
    // If no consent is given, don't show the form
    content = (
      <div className="w-full max-w-3xl text-center">
        <p className="text-gray-600 dark:text-gray-300">
          We cannot proceed without your consent. Please refresh the page if you would like to start over.
        </p>
      </div>
    );
  } else if (currentField.type === 'datetime') {
    content = (
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {currentField.label}
        </h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-center text-gray-600 dark:text-gray-400">
              Date of Incident
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
            />
          </div>
          
          <div className="space-y-4">
            <label className="block text-center text-gray-600 dark:text-gray-400">
              Approximate Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
            />
          </div>
        </div>
      </div>
    );
  } else if (currentField.type === 'location') {
    content = (
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {currentField.label}
        </h2>
        <div className="relative mb-4">
          <input
            type="text"
            value={locationSearch}
            onChange={handleLocationSearch}
            placeholder="Search for a location..."
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-32"
          />
          <button
            type="button"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                      const response = await fetch(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
                      );
                      const data = await response.json();
                      if (data.features && data.features.length > 0) {
                        const address = data.features[0].place_name;
                        handleCoordinatesUpdate(
                          { lat: latitude, lng: longitude },
                          address
                        );
                      }
                    } catch (error) {
                      console.error('Error reverse geocoding current location:', error);
                    }
                  },
                  (error) => {
                    console.error('Error getting current location:', error);
                  }
                );
              } else {
                console.error('Geolocation is not supported by this browser.');
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Use Current
          </button>
          {locationSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {locationSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => selectLocation(suggestion)}
                  className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {suggestion.place_name}
                </button>
              ))}
            </div>
          )}
        </div>
        <MapForm
          coordinates={coordinates}
          setCoordinates={handleCoordinatesUpdate}
        />
      </div>
    );
  } else if (currentField.type === 'victims') {
    if (currentVictim) {
      if (currentVictimField) {
        // Render specific victim field selection
        const options = victimOptions[currentVictimField as keyof typeof victimOptions];
        content = (
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              {currentVictimField.charAt(0).toUpperCase() + currentVictimField.slice(1).replace(/([A-Z])/g, ' $1')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleVictimFieldSelect(currentVictimField, option)}
                  className={`
                    p-6 rounded-xl text-left transition-all duration-200 ease-in-out
                    ${currentVictim[currentVictimField as keyof Victim] === option 
                      ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 shadow-md' 
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-5 h-5 rounded-full mr-3 flex items-center justify-center
                      ${currentVictim[currentVictimField as keyof Victim] === option 
                        ? 'bg-blue-500 text-white' 
                        : 'border-2 border-gray-300 dark:border-gray-600'}
                    `}>
                      {currentVictim[currentVictimField as keyof Victim] === option && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      } else {
        // Render victim fields selection
        content = (
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              {victims.some(v => v.id === currentVictim.id) ? 'Edit Victim Information' : 'Add Victim Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(victimOptions).map((field) => (
                <button
                  key={field}
                  onClick={() => selectVictimField(field)}
                  className={`
                    p-6 rounded-xl text-left transition-all duration-200 ease-in-out
                    ${currentVictim[field as keyof Victim] 
                      ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 shadow-md' 
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                      </span>
                      {currentVictim[field as keyof Victim] && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {currentVictim[field as keyof Victim]}
                        </p>
                      )}
                    </div>
                    {currentVictim[field as keyof Victim] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => saveVictim(currentVictim)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Victim
              </button>
            </div>
          </div>
        );
      }
    } else {
      // Render victims list
      content = (
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Victim Details
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Add information about specific victims you can identify. This is separate from the total victim count.
          </p>
          
          {victims.length > 0 ? (
            <div className="space-y-4 mb-6">
              {victims.map((victim) => (
                <div 
                  key={victim.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">Victim</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => editVictim(victim.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteVictim(victim.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500 dark:text-gray-400">Age:</span> {victim.age}</div>
                    <div><span className="text-gray-500 dark:text-gray-400">Gender:</span> {victim.gender}</div>
                    <div><span className="text-gray-500 dark:text-gray-400">Race/Ethnicity:</span> {victim.raceEthnicity}</div>
                    <div><span className="text-gray-500 dark:text-gray-400">Religion:</span> {victim.religion}</div>
                    <div><span className="text-gray-500 dark:text-gray-400">Education:</span> {victim.educationLevel}</div>
                    <div><span className="text-gray-500 dark:text-gray-400">Income:</span> {victim.incomeLevel}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mb-6">
              No victim details added yet. Click the button below to add details for a specific victim.
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={addNewVictim}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Victim Details
            </button>
          </div>
        </div>
      );
    }
  } else if (currentField.type === 'description') {
    content = (
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {currentField.label}
        </h2>
        <div className="space-y-4">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Please provide a brief description of the incident. This will help us better understand what happened.
          </p>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe what happened..."
            className="w-full h-48 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {description.length} characters
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    // Render regular form field
    content = (
      <div className="w-full max-w-3xl">
        <FormField 
          key={currentField.name}
          field={currentField} 
          value={formValues[currentField.name] || (currentField.isMultiSelect ? [] : '')}
          onSelect={handleOptionSelect}
        />
      </div>
    );
  }

  return (
    <main className="fixed inset-0 flex flex-col bg-white dark:bg-gray-900">
      {/* Fixed header - only show if consent is given or on consent page */}
      {(hasConsent || currentField.type === 'consent') && (
        <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Back button */}
            <button 
              onClick={handleBack}
              disabled={currentStep === 0 && !currentVictim && !currentVictimField}
              className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${currentStep === 0 && !currentVictim && !currentVictimField
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Progress indicator */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Step {currentStep + 1} of {incidentFields.length}
              </span>
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Skip button */}
            <button 
              onClick={handleSkip}
              disabled={!currentField.isSkippable || currentVictim !== null || currentVictimField !== ''}
              className={`px-4 py-1.5 text-sm font-medium rounded-full
                ${currentField.isSkippable && currentVictim === null && currentVictimField === ''
                  ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30' 
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'}`}
            >
              Skip
            </button>
          </div>
        </header>
      )}

      {/* Form content */}
      <div className={`flex-1 overflow-auto flex flex-col items-center ${(hasConsent || currentField.type === 'consent') ? 'pt-20' : 'pt-4'} px-4 pb-24`}>
        {content}
      </div>

      {/* Fixed footer with buttons */}
      {(hasConsent || currentField.type === 'consent') && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-sm py-4 px-6 z-10">
          <div className="flex justify-center gap-4">
            {currentField.type === 'consent' ? (
              <>
                <button
                  onClick={() => handleConsent(true)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${hasConsent === true
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  Yes, I consent
                </button>
                <button
                  onClick={() => handleConsent(false)}
                  className={`px-4 py-3 text-xs rounded-lg font-medium transition-colors
                    ${hasConsent === false
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  No, I do not consent
                </button>
              </>
            ) : (
              showContinueButton && (
                <button
                  onClick={currentField.type === 'victims' ? continueToNextStep : handleMultiSelectContinue}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={
                    (currentField.isMultiSelect && (formValues[currentField.name] as string[] || []).length === 0) ||
                    (currentField.type === 'speech' && (isRecording || isProcessingAudio))
                  }
                >
                  {currentField.type === 'speech' ? 'Skip' : 'Continue'}
                </button>
              )
            )}
          </div>
        </footer>
      )}
    </main>
  );
};

interface FormFieldProps {
  field: FormField;
  value: string | string[] | { lat: number; lng: number } | { date: string; time: string };
  onSelect: (name: string, value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onSelect }) => {
  const { label, name, type, options = [], isMultiSelect } = field;

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
        {label}
      </h2>
      
      {type === 'select' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => {
            const isSelected = isMultiSelect 
              ? (value as string[]).includes(option)
              : value === option;
              
            return (
              <button
                key={option}
                onClick={() => onSelect(name, option)}
                className={`
                  p-6 rounded-xl text-left transition-all duration-200 ease-in-out
                  ${isSelected
                    ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 shadow-md' 
                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    ${isMultiSelect ? 'w-5 h-5 rounded-sm' : 'w-5 h-5 rounded-full'} mr-3 flex items-center justify-center
                    ${isSelected
                      ? 'bg-blue-500 text-white' 
                      : 'border-2 border-gray-300 dark:border-gray-600'}
                  `}>
                    {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IncidentForm;
