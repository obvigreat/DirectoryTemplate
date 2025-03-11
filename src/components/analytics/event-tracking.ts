// Helper functions for tracking events throughout the application

/**
 * Track a user event
 * @param eventType The type of event to track
 * @param eventData Additional data about the event
 */
export const trackEvent = (eventType: string, eventData: any = {}) => {
  // Check if window and trackEvent function exist
  if (typeof window !== "undefined" && (window as any).trackEvent) {
    (window as any).trackEvent(eventType, eventData);
  } else {
    console.warn("Event tracking not available");
  }
};

// Predefined event tracking functions
export const trackListingView = (listingId: number, listingTitle: string) => {
  trackEvent("listing_view", { listingId, listingTitle });
};

export const trackListingSave = (listingId: number, listingTitle: string) => {
  trackEvent("listing_save", { listingId, listingTitle });
};

export const trackContactOwner = (listingId: number, listingTitle: string) => {
  trackEvent("contact_owner", { listingId, listingTitle });
};

export const trackBookingRequest = (
  listingId: number,
  listingTitle: string,
  bookingDate: string,
) => {
  trackEvent("booking_request", { listingId, listingTitle, bookingDate });
};

export const trackReviewSubmit = (
  listingId: number,
  listingTitle: string,
  rating: number,
) => {
  trackEvent("review_submit", { listingId, listingTitle, rating });
};

export const trackSearch = (
  query: string,
  category: string,
  location: string,
  resultsCount: number,
) => {
  trackEvent("search", { query, category, location, resultsCount });
};

export const trackSubscriptionView = (plan: string) => {
  trackEvent("subscription_view", { plan });
};

export const trackSubscriptionPurchase = (plan: string, price: number) => {
  trackEvent("subscription_purchase", { plan, price });
};

export const trackSignUp = (method: string) => {
  trackEvent("sign_up", { method });
};

export const trackSignIn = (method: string) => {
  trackEvent("sign_in", { method });
};

export const trackProfileUpdate = () => {
  trackEvent("profile_update");
};

export const trackMapSearch = (location: string, radius: number) => {
  trackEvent("map_search", { location, radius });
};

export const trackReportSubmit = (
  contentType: string,
  contentId: string,
  reason: string,
) => {
  trackEvent("report_submit", { contentType, contentId, reason });
};
