"use client"

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/ec/logo-svg";
import Link from "next/link";
import { CarFrontIcon, MicIcon } from 'lucide-react';

export default function ExperienceCeylon() {
  return (
    <main className="min-h-screen text-foreground">
      <motion.div
        className="fixed top-0 w-full flex items-center p-4 z-[9999] bg-transparent backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="">
          <Button variant="outline" className="text-gray-700 hover:text-orange-500 transition-all">Explore All</Button>
        </div>
        <div className="flex grow items-center justify-center">
          <Logo className="w-[125px] sm:w-[200px] fill-primary" />
        </div>
        <div className="">
          <Button>Log In</Button>
        </div>
      </motion.div>
      <div className="w-screen relative">
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full flex justify-center"
          >
              <div className="relative w-full h-fit mx-2 sm:mx-4 top-24 flex flex-col items-start justify-center space-y-4 bg-blue-700 border border-blue-900 p-8 sm:p-20 rounded-2xl text-white text-left">
                <div className="w-[290px] absolute top-14 right-20">
                  <svg className="hidden sm:block" viewBox="0 0 332 580" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_697_5)">
                    <path d="M330 407V409L332 414V417L331 423L324 447V449V452L323 455L321 459L320 461V464L317 468L315 470L316 474L315 478L301 500L296 505L288 511L285 512L281 514L253 535L248 538L230 545V542L229 541H228L227 542V543V545L226 546L225 547H223L220 549L216 551L201 554L193 557L185 558L181 560L179 563L175 562L173 563H171L166 568L160 572L157 575H151H149L147 576L145 577L141 580H140H139L136 579L134 578L132 577H131L123 578L120 577L119 576L118 575V574L117 573L115 574L112 575L108 574H107L106 573L105 572H104L103 573H102H101L100 571L99 570L92 568H90L88 567L85 565L84 564H83H82L81 565L79 563L67 550L66 549H65V548V547V546L64 545L63 544L56 529V528V527V525H55L54 522L53 515L50 510L48 503V501V500H47L46 499V498H47H48L47 490V489L44 481L31 449L29 438V436V426V425L30 422L31 420V418L23 393L24 390V392L25 393L26 394V396L28 401L29 402L30 401V400H31V395L30 393L29 392V391H27L26 390L25 389L26 388V387V386L19 333L18 331L19 330L20 331L21 328V325L22 324V322L21 320L20 318V317L19 315V310L16 293V291L14 288L12 280L10 274L6 257V252L7 253L8 251L7 242L6 239L9 238L11 235L13 231V228L14 227L18 220L16 225L13 230L14 231L15 233H16H18L17 237L15 240V241H14H13V243V246V247L11 255V257V260L14 263V264L11 270L16 273L23 274L26 271V269L25 267L24 266V265L22 263L21 262L20 261L25 251V250V248L24 247L23 246V244V241V240V239L22 238V236L23 235L25 232V230L26 227L27 221L29 207V205L30 204L31 203L32 201V195V192L34 190L37 188L39 186V185L40 181H41V179L42 176L44 162L40 153V151L41 140L40 137V135L39 134V132H40L42 131H43L52 123L56 121L58 119L59 116L61 112L62 107L67 95V94V92L68 88V80L69 79L68 78L67 77L63 75L61 74L60 71L59 67V65L61 63L64 62L68 60H71L72 59L75 55H76V54H77L79 53H80L79 50L78 49L77 48L75 46L72 44L61 37L59 35H64L68 37L77 42L86 44L88 45L92 48V50L91 51V52L92 53L91 54L94 56L101 54L114 49H118L126 51L135 56L142 57L132 50L129 48H126H125V47L122 45H121H120H119H117H116L115 46L113 45H112H107L106 44L95 35L91 32H89L81 28L79 27H77V30L78 32L80 33L81 34L80 36H79H78L77 35L74 34L68 29L65 27L67 29L70 32L71 34L68 33L64 31L57 27L51 23L48 22L46 21L45 20V21L43 20V19L42 17V15L41 14L40 13L39 11L38 9L41 8L47 2L49 1L61 2L67 1L69 2L70 4V7V8H72H73L76 9L77 10L78 11H80H81V10H82L84 11L88 16L101 30L106 33L117 38V37L112 34L99 23L88 11L82 8L74 6L72 5L71 2L75 1H76L79 0H85L88 1L90 2L91 7L93 9L112 31L115 34L121 37L162 70L163 72L165 74L168 77L170 79L168 80H167L165 78L164 77H162H160L161 78V79L169 86L172 88L171 86L170 84V83L172 82L173 83L175 88L176 90L182 102L181 101L178 100H176L175 102L176 103H179L181 104V105V108H182L183 107L184 106L185 109L187 114L190 118L193 120V121V122V123H191L189 120L188 119L183 118L181 117L182 119H183L188 124V127L190 128L188 130L187 132L189 133H192L194 131L195 129L196 126L202 133L207 141L208 143H211L213 145L217 153V154L218 155L222 156L224 160L226 168V166H227H228L229 167V168L233 173L234 175V178L233 179H231L230 181H231H232V180H233L236 187L237 191H233L234 189L233 187H231L230 189V191L231 193L232 194L231 196H230L228 194L226 193L223 192L221 193L219 196L220 197H222L225 194L227 197L229 199L231 202H235H241L244 201L242 197L246 196L248 195H249L251 196L253 198L254 200L255 206L257 214V216V218L256 216L254 212H252V213L253 217V218V220H254L255 221H257H259L260 227L261 231V232V234L262 236L265 246L266 253L264 256L262 250V249L260 243H258V248V249V250V251L259 252H260V253L262 256L264 258H267L268 254H269L270 256V257L271 262L272 264L274 266L275 268L277 272L278 271V270H279L280 271L279 272L280 273V274L281 273L282 272H283V273L284 274L283 275V276V277V278L284 280L286 281L287 282L288 284H287V285H286V286L285 288L287 293L288 294L290 297L293 296H294L295 299L296 301L297 302L303 308L305 312L306 314L302 315L301 314L297 310L295 308L293 307H292H291L289 309L288 312L290 313H292H293L294 311L296 312L297 313H298V314V315L300 317L302 319L304 321L305 324L304 325L305 326V328L306 327V325H307L311 328L312 329L314 336L313 340H314V342V343L313 344L312 345L313 346L314 347V348V349L315 350L314 351V352L315 353L316 351H317L319 357V359H320V357V355L321 353L322 352V351L321 350V349L322 350L324 351V352V355L327 359L330 372V407Z" fill="#000000" fill-opacity="0.8" stroke="white" stroke-width="2"/>
                    <path d="M309 322V321L308 319V318L307 316V315L308 313V312L307 310L309 312L311 316L312 318L313 319L314 323L318 329L319 331L322 344V347L320 349L317 347V346H316V345L317 335V332L315 331L314 329L309 322Z" fill="#000000" fill-opacity="0.8" stroke="white" stroke-width="2"/>
                    <path d="M9 112L7 111L6 110L7 108H9H15L18 109H21L28 112L34 115L39 120H36L32 117H29L33 121L36 125L38 127H34L32 125L30 123L29 122L28 121L21 116L18 115L15 113H13L12 112H9Z" fill="#000000" fill-opacity="0.8" stroke="white" stroke-width="2"/>
                    <path d="M11 49L10 50L9 51H5L2 50L0 48V42V41H1L2 42L3 44L6 45H9L11 49Z" fill="#000000" fill-opacity="0.8" stroke="white" stroke-width="2"/>
                    <path d="M36 31L33 30L31 26L27 19L29 17V14L30 11L34 10L35 11L36 12L35 14V16V18V19V20V21L36 22H37V23L40 22L41 23V25V26L43 27L45 28L47 29L48 30L47 32H45L43 31L41 30H40L38 31H36Z" fill="#000000" fill-opacity="0.8" stroke="white" stroke-width="2"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_697_5">
                    <rect width="332" height="580" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="w-full text-4xl text-balance sm:text-5xl font-bold">
                  Plan your next get away.
                </p>
                <p className="text-md sm:text-xl font-light text-gray-200">
                  Our AI, <span className="font-bold">Sky</span> helps you discover your unique path through this magical island. <br />
                </p>
                {/* <p className="text-sm sm:text-xl text-foreground/90 font-light">
                  Discover the beauty of Sri Lanka with personalized travel experiences
                </p> */}

                <div className="space-y-4 pt-12 pb-2">
                  {/* <div className="flex bg-white gap-2 py-2 px-4 rounded-full">
                    <input type="date" className="p-2" placeholder="Travel Date" />
                    <input type="date" className="p-2" placeholder="Travel Date" />
                    <input type="text" className="p-2" placeholder="Adults" />
                  </div> */}

                  {/* <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="default" className="rounded-full border border-gray-300 text-gray-700 
           hover:bg-orange-100 hover:border-orange-500 transition-all 
           duration-200 ease-in-out shadow-sm bg-transparent gap-2">
                      <PlaneIcon className="w-6 h-6" />
                      Flights
                    </Button>
                    <Button variant="outline" size="default" className="rounded-full bg-orange-500 text-white border-orange-500 shadow-md gap-2">
                      <CarFrontIcon className="w-6 h-6" />
                      Transport
                    </Button>
                    <Button variant="outline" size="default" className="rounded-full bg-teal-700 border-none text-white gap-2">
                      <BedDoubleIcon className="w-6 h-6" />
                      Acomodation
                    </Button>
                    <Button variant="outline" size="default" className="rounded-full bg-teal-700 border-none text-white gap-2">
                      <FerrisWheelIcon className="w-6 h-6" />
                      Activities
                    </Button>
                    <Button variant="outline" size="default" className="rounded-full border-white bg-transparent text-white gap-2">
                      <PalmtreeIcon className="w-6 h-6" />
                      All Inclusive
                    </Button>
                  </div> */}
                  {/* <div className="relative">
                    <button className="h-28 w-28 flex justify-center items-center bg-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300">
                      <MicIcon className="w-16 h-16" />
                    </button>
                    <motion.div 
                      className="absolute w-[160px] h-[160px]"
                      style={{ top: '-23px', left: '-23px' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 160 160">
                        <defs>
                          <path
                            id="circlePath"
                            d="M 80, 80 m -64, 0 a 64,64 0 1,1 128,0 a 64,64 0 1,1 -128,0"
                            fill="none"
                          />
                        </defs>
                        <text className="text-[12px] fill-white font-medium tracking-[0.5px]">
                          <textPath href="#circlePath" startOffset="0%">
                            Talk to Sky • Talk to Sky • Talk to Sky • Talk to Sky • Talk to Sky •
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>
                  </div> */}

                  <button className="h-16 mt-4 bg-orange-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <Link href="/wizard">
                      <div className="bg-blue-700 rounded-full size-fit p-3 ml-2">
                        <MicIcon className="w-7 h-7" strokeWidth="1.3" />
                      </div>
                    <div className="pl-4 pr-8 font-semibold">Talk to Sky</div>
                    </Link>
                  </button>
                  <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-200 text-xs sm:text-sm font-light"
                >
                  Get your personalized travel itinerary in minutes.
                </motion.p>
                </div>

                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full flex flex-col sm:flex-row gap-2 pt-8"
                >
                  <Button
                    size="lg"
                    className="px-12 py-6 text-xl border-4 rounded-full bg-gradient-to-r from-[#4a9eff] to-[#37d3ad] hover:opacity-90 transition-opacity"
                    onClick={() => router.push('/plan')}
                  >
                    Plan My Trip
                  </Button>
                </motion.div> */}
              </div>
          </motion.div>
      </div>
      <div className="mx-6 mt-32 flex flex-wrap gap-4">
        <div className="border rounded-xl p-8 text-muted-foreground flex gap-4 shadow-sm">
          <CarFrontIcon className="w-6 h-6" /> 
          Travel Guide In Your Pocket
        </div>
        <div className="border rounded-xl p-8 text-muted-foreground font-bold flex gap-4 shadow-sm">
          <CarFrontIcon className="w-6 h-6" /> 
          Best Price Match
        </div>
        <div className="border rounded-xl p-8 text-muted-foreground font-bold flex gap-4 shadow-sm">
          <CarFrontIcon className="w-6 h-6" /> 
          Hassle Free
        </div>
      </div>
      <div className="">
        {/* <FeaturedStaysCarousel />
        <PopularExperiencesCarousel /> */}
      </div>
    </main>
  );
} 