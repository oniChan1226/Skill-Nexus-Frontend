import type {
  DetailedUserForTrading,
  TradingSkill,
} from "@/types/trading.types";
import { IconCheck, IconExchange, IconX } from "@tabler/icons-react";
import { useState } from "react";
import Button from "./shared/Button";
import {
  useGetMyOfferedSkillsQuery,
} from "@/services/skills.service";

const TradeSkillsModal = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: DetailedUserForTrading;
}) => {
  const [selectedOfferedSkill, setSelectedOfferedSkill] =
    useState<TradingSkill | null>(null);
  const [selectedRequiredSkill, setSelectedRequiredSkill] =
    useState<TradingSkill | null>(null);

  const handleSubmit = () => {
    if (selectedOfferedSkill && selectedRequiredSkill) {
      console.log("Trade Request:", {
        teachSkill: selectedOfferedSkill,
        learnSkill: selectedRequiredSkill,
        withUser: user.userId._id,
      });
      alert(
        `Trade request sent!\nYou'll teach: ${selectedOfferedSkill.name}\nYou'll learn: ${selectedRequiredSkill.name}`
      );
      onClose();
    }
  };
  const {
    data: offeredSkillsData,
    // isLoading: isLoadingOffered,
    // error: offeredError,
  } = useGetMyOfferedSkillsQuery();
  console.log("Offered Skills Data:", offeredSkillsData);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto 
                      bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl 
                      rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.1)] 
                      border border-neutral-200/60 dark:border-neutral-800/70
                      transition-all duration-300"
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 bg-gradient-to-r from-indigo-500/90 to-purple-600/90 dark:from-indigo-600/90 dark:to-purple-700/90 
                        p-6 rounded-t-2xl backdrop-blur-md flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <IconExchange size={20} className="text-indigo-500" />
            </div>
            <div>
              <h2 className="md:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Trade Skills with {user.userId.name}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Choose what you’ll teach and learn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
          >
            <IconX size={18} className="text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* How it Works */}
          <div
            className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 
                          border border-indigo-200/40 dark:border-indigo-800/40 
                          rounded-xl p-4"
          >
            <h3 className="font-medium text-indigo-900 dark:text-indigo-200 mb-2">
              How it works
            </h3>
            <ol className="text-sm text-indigo-700 dark:text-indigo-300 list-decimal list-inside space-y-1">
              <li>
                Select a skill you want to teach from your offered skills.
              </li>
              <li>Pick a skill you want to learn from {user.userId.name}.</li>
              <li>Submit your trade request and wait for confirmation.</li>
            </ol>
          </div>

          {/* Offered Skills */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
              <span
                className="flex items-center justify-center w-6 h-6 
                               bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 
                               dark:text-indigo-400 rounded-full text-sm font-bold"
              >
                1
              </span>
              Select Skill You'll Teach
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {offeredSkillsData?.skills.map((skill: any) => (
                <button
                  key={skill._id}
                  onClick={() => setSelectedOfferedSkill(skill as any)}
                  className={`group p-4 text-left rounded-xl border transition-all
                    ${
                      selectedOfferedSkill?._id === skill._id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-neutral-800 dark:text-neutral-100">
                      {skill.name}
                    </span>
                    {selectedOfferedSkill?._id === skill._id && (
                      <IconCheck
                        size={20}
                        className="text-indigo-500 dark:text-indigo-400"
                      />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 capitalize">
                    {skill.proficiencyLevel}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
              <span
                className="flex items-center justify-center w-6 h-6 
                               bg-purple-100 dark:bg-purple-900/30 text-purple-600 
                               dark:text-purple-400 rounded-full text-sm font-bold"
              >
                2
              </span>
              Select Skill You Want to Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user.offeredSkills.map((skill) => (
                <button
                  key={skill._id}
                  onClick={() => setSelectedRequiredSkill(skill)}
                  className={`group p-4 text-left rounded-xl border transition-all
                    ${
                      selectedRequiredSkill?._id === skill._id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-purple-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-neutral-800 dark:text-neutral-100">
                      {skill.name}
                    </span>
                    {selectedRequiredSkill?._id === skill._id && (
                      <IconCheck
                        size={20}
                        className="text-purple-500 dark:text-purple-400"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedOfferedSkill && selectedRequiredSkill && (
            <div
              className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 
                            border border-indigo-200/40 dark:border-indigo-800/40 
                            rounded-xl p-4"
            >
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                Trade Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <IconExchange
                    size={16}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    You’ll teach:{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {selectedOfferedSkill.name}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IconExchange
                    size={16}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    You’ll learn:{" "}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {selectedRequiredSkill.name}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 bg-neutral-100/70 dark:bg-neutral-800/80 border-t border-neutral-200 dark:border-neutral-700 
                        p-6 rounded-b-2xl backdrop-blur-sm"
        >
          <div className="flex justify-end gap-3">
            <Button onClick={onClose} className="!px-6 !py-2">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedOfferedSkill || !selectedRequiredSkill}
              className="!px-6 !py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconExchange size={18} />
              Send Trade Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeSkillsModal;
