import SubscriptionBenefits from "../subscription-benefits";

export default function SubscriptionBenefitsStoryboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Subscription Benefits Comparison
      </h1>
      <SubscriptionBenefits showBusinessTier={true} />
    </div>
  );
}
