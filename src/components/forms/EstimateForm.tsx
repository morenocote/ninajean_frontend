import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";

import { API_URL } from "@/config";

const services = [
  "Restoration Services",
  "Painting (Interior & Exterior)",
  "Concrete Services",
  "Drywall & Taping",
  "Flooring Installation",
  "Renovations & Remodeling",
  "Light Demolition",
  "Finish Carpentry",
  "Doors & Windows Installation",
  "Siding & Exterior Work",
  "Decks & Fences",
  "Other",
];

interface EstimateFormProps {
  preselectedService?: string;
  compact?: boolean;
}

export function EstimateForm({ preselectedService, compact = false }: EstimateFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Calgary",
    postalCode: "",
    service: preselectedService || "",
    propertyType: "",
    urgency: "",
    description: "",
    budget: "",
    contactMethod: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-secondary p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground">Thank You!</h3>
        <p className="mt-2 text-muted-foreground">
          Your estimate request has been received. We'll get back to you within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            required
            placeholder="John Smith"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            placeholder="(403) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            required
            placeholder="T2P 1A1"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
          />
        </div>

        {/* Service */}
        <div className="space-y-2">
          <Label>Service Needed *</Label>
          <Select
            required
            value={formData.service}
            onValueChange={(value) => setFormData({ ...formData, service: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label>Property Type *</Label>
          <Select
            required
            value={formData.propertyType}
            onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <Label>Urgency *</Label>
          <Select
            required
            value={formData.urgency}
            onValueChange={(value) => setFormData({ ...formData, urgency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="When do you need this?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP</SelectItem>
              <SelectItem value="1-2-weeks">1–2 Weeks</SelectItem>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">Estimated Budget (Optional)</Label>
          <Input
            id="budget"
            placeholder="e.g., $5,000 - $10,000"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>

        {/* Contact Method */}
        <div className="space-y-2">
          <Label>Preferred Contact Method *</Label>
          <Select
            required
            value={formData.contactMethod}
            onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="How should we contact you?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call">Phone Call</SelectItem>
              <SelectItem value="text">Text Message</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Project Description *</Label>
        <Textarea
          id="description"
          required
          placeholder="Please describe your project, including any specific requirements or concerns..."
          className="min-h-[120px]"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground">
          I agree to be contacted by Ninajean Maintenance & Renovation regarding my estimate
          request.
        </Label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded-md">
          {error}. Por favor, inténtalo de nuevo.
        </div>
      )}

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full" disabled={!consent || loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Get Your Free Estimate"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        We'll respond within 24–48 hours.
      </p>
    </form>
  );
}
