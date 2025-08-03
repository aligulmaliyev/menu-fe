import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useFeedbackStore } from "./useFeedbackStore";

export const Feedback = () => {
  const {
    feedback,
    setFeedback,
    rating,
    setRating,
    customerName,
    setCustomerName,
    submitFeedback,
  } = useFeedbackStore();

  return (
    <div className="pb-20 px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Rəy Bildirin</h2>
        <p className="text-gray-600">Xidmətimiz haqqında rəyinizi bölüşün</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Adınız</Label>
          <Input
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Adınızı daxil edin"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Reytinq</Label>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 ${star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
              >
                <Star className="h-8 w-8 fill-current" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="feedback">Rəyiniz</Label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Xidmətimiz haqqında rəyinizi yazın..."
            className="mt-1 min-h-[120px]"
          />
        </div>

        <Button
          onClick={submitFeedback}
          className="w-full"
          disabled={!feedback.trim() || rating === 0}
        >
          Rəy Göndər
        </Button>
      </div>
    </div>
  );
}
