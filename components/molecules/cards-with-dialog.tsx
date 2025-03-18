"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Building,
  Star,
  StarOff,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
} from "@/components/ui/morphing-dialog"

export interface MobileCardProps {
  title: string
  subtitle?: string
  description?: string
  image?: string
  initials?: string
  status?: "pending" | "in-progress" | "completed" | "cancelled" | "on-hold"
  priority?: "low" | "medium" | "high" | "urgent"
  progress?: number
  timestamp?: string
  tags?: string[]
  isSelectable?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onSelect?: (selected: boolean) => void
  expandable?: boolean
  expandedContent?: React.ReactNode
  type: "crm" | "task" | "inventory" | "product"
  detailData?: Record<string, any>
}

export function MobileCardWithDialog({
  title,
  subtitle,
  description,
  image,
  initials,
  status,
  priority,
  progress,
  timestamp,
  tags = [],
  isSelectable = false,
  isFavorite = false,
  onFavoriteToggle,
  onEdit,
  onDelete,
  onSelect,
  expandable = false,
  expandedContent,
  type,
  detailData = {},
}: MobileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const handleSelect = (checked: boolean) => {
    setIsSelected(checked)
    onSelect?.(checked)
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "in-progress":
        return "bg-blue-500 hover:bg-blue-600"
      case "completed":
        return "bg-green-500 hover:bg-green-600"
      case "cancelled":
        return "bg-red-500 hover:bg-red-600"
      case "on-hold":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const renderDetailContent = () => {
    switch (type) {
      case "crm":
        return (
          <div className="max-w-4xl mx-auto pt-12 pb-20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={image} alt={title} />
                <AvatarFallback className="text-xl">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{subtitle}</p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{detailData.email || "email@example.com"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{detailData.phone || "+1 (555) 123-4567"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{detailData.company || "Acme Inc."}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{detailData.address || "123 Business Ave, Suite 100, San Francisco, CA 94107"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last contacted: {detailData.lastContacted || "3 days ago"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Next follow-up: {detailData.nextFollowUp || "Tomorrow at 2:00 PM"}</span>
                  </div>
                  {status && (
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(status)} text-white`}>{status.replace("-", " ")}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Notes</h3>
              <p className="text-muted-foreground">{description || detailData.notes || "No notes available."}</p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Contact
              </Button>
              <Button>
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
        )

      case "task":
        return (
          <div className="max-w-4xl mx-auto pt-12 pb-20 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{title}</h2>
                {priority && <Badge className={`${getPriorityColor(priority)}`}>{priority} priority</Badge>}
              </div>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Task Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Assigned to: {detailData.assignedTo || "Sarah Johnson"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Start date: {detailData.startDate || "Mar 10, 2025"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Due date: {detailData.dueDate || "Mar 20, 2025"}</span>
                  </div>
                  {status && (
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(status)} text-white`}>{status.replace("-", " ")}</Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Progress</h3>
                {progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">
                {description || detailData.description || "No description available."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Subtasks</h3>
              <div className="space-y-2">
                {(
                  detailData.subtasks || [
                    { id: 1, title: "Research competitors", completed: true },
                    { id: 2, title: "Create wireframes", completed: true },
                    { id: 3, title: "Design mockups", completed: false },
                    { id: 4, title: "Implement responsive layout", completed: false },
                  ]
                ).map((subtask: any) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <Checkbox id={`subtask-${subtask.id}`} checked={subtask.completed} />
                    <label
                      htmlFor={`subtask-${subtask.id}`}
                      className={subtask.completed ? "line-through text-muted-foreground" : ""}
                    >
                      {subtask.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
              <Button>Mark Complete</Button>
            </div>
          </div>
        )

      case "inventory":
        return (
          <div className="max-w-4xl mx-auto pt-12 pb-20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {image && (
                <div className="relative h-40 w-40 overflow-hidden rounded-md">
                  <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{subtitle}</p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                {status && (
                  <Badge className={`mt-2 ${getStatusColor(status)} text-white`}>{status.replace("-", " ")}</Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Item Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">SKU:</span>
                    <span>{detailData.sku || subtitle || "WH-2023-BLK"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">In Stock:</span>
                    <span>{detailData.stock || "24 units"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Price:</span>
                    <span>{detailData.price || "$149.99"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Cost:</span>
                    <span>{detailData.cost || "$89.99"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Margin:</span>
                    <span>{detailData.margin || "40%"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Location</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Warehouse:</span>
                    <span>{detailData.warehouse || "Warehouse B"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Aisle:</span>
                    <span>{detailData.aisle || "12"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Shelf:</span>
                    <span>{detailData.shelf || "C3"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Bin:</span>
                    <span>{detailData.bin || "45"}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">
                {description || detailData.description || "No description available."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Inventory History</h3>
              <div className="space-y-2">
                {(
                  detailData.history || [
                    { date: "Mar 15, 2025", action: "Stock count", quantity: "+2", user: "Alex Kim" },
                    { date: "Mar 10, 2025", action: "Shipment received", quantity: "+30", user: "Jamie Lee" },
                    { date: "Mar 5, 2025", action: "Order fulfilled", quantity: "-5", user: "Taylor Wong" },
                  ]
                ).map((record: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm py-1 border-b">
                    <span>{record.date}</span>
                    <span>{record.action}</span>
                    <span className={record.quantity.startsWith("+") ? "text-green-600" : "text-red-600"}>
                      {record.quantity}
                    </span>
                    <span>{record.user}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Item
              </Button>
              <Button>Restock</Button>
            </div>
          </div>
        )

      case "product":
        return (
          <div className="max-w-4xl mx-auto pt-12 pb-20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {image && (
                <div className="relative h-40 w-40 overflow-hidden rounded-md">
                  <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{subtitle}</p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                {status && (
                  <Badge className={`mt-2 ${getStatusColor(status)} text-white`}>{status.replace("-", " ")}</Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Price:</span>
                    <span>{detailData.price || subtitle || "$29.99/month"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{detailData.category || "Subscription"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{detailData.created || "Jan 15, 2025"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{detailData.updated || timestamp || "Mar 15, 2025"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Performance</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Active Customers:</span>
                    <span>{detailData.customers || "1,245"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Monthly Revenue:</span>
                    <span>{detailData.revenue || "$37,324.55"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Growth:</span>
                    <span className="text-green-600">{detailData.growth || "+12.5%"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Churn Rate:</span>
                    <span>{detailData.churn || "2.3%"}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">
                {description ||
                  detailData.description ||
                  "Access to all premium features including advanced analytics and priority support."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {(
                  detailData.features || [
                    "Advanced analytics",
                    "Priority support",
                    "Custom exports",
                    "Unlimited users",
                    "API access",
                  ]
                ).map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Button>
              <Button>View Analytics</Button>
            </div>
          </div>
        )

      default:
        return <div className="max-w-4xl mx-auto pt-12 pb-20">No details available</div>
    }
  }

  return (
    <MorphingDialog transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <MorphingDialogTrigger>
        <Card className="w-full max-w-md overflow-hidden border shadow-sm p-0 space-y-0 gap-0">
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isSelectable && (
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={handleSelect}
                    className="mr-1"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {(image || initials) && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={image} alt={title} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <MorphingDialogTitle>
                      <span className="font-medium line-clamp-1">{title}</span>
                    </MorphingDialogTitle>
                    {priority && (
                      <Badge variant="outline" className={`text-xs px-1.5 py-0 ${getPriorityColor(priority)}`}>
                        {priority}
                      </Badge>
                    )}
                  </div>
                  {subtitle && (
                    <MorphingDialogSubtitle>
                      <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </MorphingDialogSubtitle>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {onFavoriteToggle && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onFavoriteToggle()
                    }}
                  >
                    {isFavorite ? (
                      <Star className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <StarOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                )}
                {(onEdit || onDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onEdit && (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                          }}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {description && (
              <MorphingDialogDescription disableLayoutAnimation>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
              </MorphingDialogDescription>
            )}

            <div className="flex flex-wrap gap-1.5 mb-2">
              {status && (
                <Badge className={`text-xs ${getStatusColor(status)} text-white`}>{status.replace("-", " ")}</Badge>
              )}
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between p-3 pt-0">
            {timestamp && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {timestamp}
              </div>
            )}

            {expandable && expandedContent && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 ml-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                {isExpanded ? "Less" : "More"}
              </Button>
            )}
          </CardFooter>

          {expandable && isExpanded && expandedContent && (
            <div className="px-3 pb-3 border-t pt-2">{expandedContent}</div>
          )}
        </Card>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="bg-background fixed z-[999] inset-0 w-full h-full overflow-y-auto p-4 sm:p-6 md:p-8">
          <MorphingDialogClose
            className="fixed right-4 top-4 z-[9999] bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          />
          {renderDetailContent()}
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

