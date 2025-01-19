"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "dotenv/config";

const Spinner = () => <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>;

export default function SpiritualAIAgent() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAnswer = async (question: string) => {
    //get response from API
    const url = process.env.API_URL;
    const response = await fetch(`${url}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const processedAnswer = await getAnswer(question);
    setAnswer(processedAnswer.answer);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spiritual AI Agent</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a spiritual question..." className="w-full" />
        <Button type="submit" disabled={isLoading || question.trim() === ""}>
          Ask
        </Button>
      </form>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <Spinner />
        </div>
      )}
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
