"use client"
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

const MAX_NAME_LENGTH = 50;
const MAX_REVIEW_LENGTH = 200;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(MAX_NAME_LENGTH, {
    message: `Name must not exceed ${MAX_NAME_LENGTH} characters.`
  }),
  petType: z.enum(["dog", "cat", "bird", "other"], {
    required_error: "Please select a pet type.",
  }),
  rating: z.number().min(1, {
    message: "Please select a rating.",
  }).max(5),
  review: z.string().min(10, {
    message: "Review must be at least 10 characters.",
  }).max(MAX_REVIEW_LENGTH, {
    message: `Review must not exceed ${MAX_REVIEW_LENGTH} characters.`
  }),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to share your review publicly.",
  })
})

export default function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      petType: undefined,
      rating: 0,
      review: "",
      consent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Log the form data instead of submitting to server
      console.log('Form submitted:', values);
      
      setMessage({ type: 'success', text: 'Thank you for your review!' });
      form.reset();
    } catch (err) {
      console.error('Error:', err);
      setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-6">
      {message && (
        <div className={`p-4 rounded-xl mb-4 ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {field.value.length}/{MAX_NAME_LENGTH} characters
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pet Type Select */}
            <FormField
              control={form.control}
              name="petType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    >
                      <option value="">Select pet type</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate our service</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-3xl transition-colors ${
                          star <= field.value 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        } hover:text-yellow-500 focus:outline-none`}
                        onClick={() => field.onChange(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review Textarea */}
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Share your experience..."
                  />
                </FormControl>
                <div className="text-xs text-[var(--text-secondary)]">
                  {field.value.length}/{MAX_REVIEW_LENGTH} characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Consent Checkbox */}
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 rounded mt-1"
                  />
                </FormControl>
                <Label className="text-sm text-[var(--text-secondary)]">
                  I agree to share this review publicly
                </Label>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </Form>
    </Card>
  );
} 