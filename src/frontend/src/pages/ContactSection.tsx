import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/context/LanguageContext";
import {
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export function ContactSection() {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3 bg-accent/10 px-3 py-1 rounded-full">
            {t.contact.heading}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground text-balance">
            {t.contact.heading}
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-lg mx-auto">
            {t.contact.subheading}
          </p>
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/918080713636"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp_button"
            className="inline-flex items-center gap-2 mt-5 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1ebe5d] transition-smooth shadow-subtle text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {t.contact.whatsapp}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Info panel */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-subtle border border-border">
              <h3 className="font-display font-semibold text-foreground mb-5 text-lg">
                {t.contact.heading}
              </h3>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground mb-1">
                      {t.contact.address}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <a
                        href="https://maps.google.com/?q=429+Raja+Ram+Mohan+Roy+Rd+Mumbai+400004"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid="contact.maps_link"
                        className="hover:text-primary hover:underline transition-smooth"
                      >
                        Ground Floor, Karsandas Natha Building,
                        <br />
                        429 Raja Ram Mohan Roy Rd,
                        <br />
                        near HN Reliance Hospital,
                        <br />
                        Charni Road East, Girgaon,
                        <br />
                        Mumbai, Maharashtra 400004
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground mb-1">
                      {t.contact.phoneLabel}
                    </p>
                    <a
                      href="tel:+918080713636"
                      data-ocid="contact.phone_link"
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      +91 80807 13636
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground mb-1">
                      {t.contact.hours}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.hoursDetail}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.contact.hoursWeekend}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-subtle h-44 bg-card">
              <iframe
                title="Mumbai Clinic Location"
                src="https://maps.google.com/maps?q=429+Raja+Ram+Mohan+Roy+Rd,+Girgaon,+Mumbai+400004&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact form */}
          <div
            className="bg-card rounded-2xl p-7 shadow-subtle border border-border"
            data-ocid="contact.form_panel"
          >
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center h-full min-h-64 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {t.contact.successMsg}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {t.contact.successFollowUp}
                </p>
                <button
                  type="button"
                  data-ocid="contact.reset_button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", phone: "", email: "", message: "" });
                  }}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-ocid="contact.form"
              >
                <h3 className="font-display font-semibold text-foreground text-lg mb-5">
                  {t.contact.sendMessage}
                </h3>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.contact.name}
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    data-ocid="contact.name_input"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.name}
                    required
                    className="bg-background border-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-phone"
                      className="text-sm font-medium text-foreground"
                    >
                      {t.contact.phone}
                    </Label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      data-ocid="contact.phone_input"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      type="tel"
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-foreground"
                    >
                      {t.contact.email}
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      data-ocid="contact.email_input"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      type="email"
                      className="bg-background border-input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.contact.message}
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    data-ocid="contact.message_textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.contact.message}
                    rows={4}
                    required
                    className="bg-background border-input resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold transition-smooth"
                >
                  {loading ? (
                    <span
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2"
                    >
                      <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      {t.contact.sending}
                    </span>
                  ) : (
                    t.contact.send
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
