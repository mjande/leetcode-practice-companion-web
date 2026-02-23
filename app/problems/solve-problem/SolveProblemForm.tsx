'use client';

import {FormEvent, useState} from "react";
import '../ProblemList.css';
import './SolveProblem.css';
import {Problem} from "@/app/types/problem";
import {useRouter} from "next/dist/client/components/navigation";
import {capitalize} from "@/lib/utils/string";

type SolveProblemFormProps = {
  problem: Problem,
  onClose: () => void,
}

export default function SolveProblemForm({ problem, onClose }: SolveProblemFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    solvedWithoutHelp: false,
    solvedWithCorrectComplexity: false,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/problems/${problem.id}/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setIsSubmitting(false);

    if (!response.ok) {
      console.error('Error solving problem:', response.status);
      alert('Failed to solve problem. Please try again');
      return;
    }

    alert(`${problem.number}. ${problem.name} has been solved successfully.`);
    onClose();
    router.refresh();
  }

  function handleRadioChange(name: string, value: boolean) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
        <div className="modal-overlay" onClick={() => onClose()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Solve Problem</h2>
            </div>

            <div className="problem-details">
              <h3 className="problem-details-header">Problem Details</h3>
              <p>Problem: {problem.number}. {problem.name}</p>
              <p>Difficulty: {capitalize(problem.difficulty)}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <p>Did you solve the problem without help?</p>
                <div className="radio-options-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      name="solvedWithoutHelp"
                      checked={formData.solvedWithoutHelp}
                      onChange={() => handleRadioChange('solvedWithoutHelp', true)}
                      required
                    />
                    <span>Yes</span>
                  </div>

                  <div className="radio-option">
                    <input
                      type="radio"
                        name="solvedWithoutHelp"
                        checked={!formData.solvedWithoutHelp}
                        onChange={() => handleRadioChange('solvedWithoutHelp', false)}
                        required
                      />
                    <span>No</span>
                  </div>
                </div>
              </div>


             <div className="form-group">
               <p>Did you guess the time complexity correctly?</p>
               <div className="radio-options-group">
                 <div className="radio-option">
                   <input
                     type="radio"
                     name="solvedWithCorrectComplexity"
                     checked={formData.solvedWithCorrectComplexity}
                     onChange={() => handleRadioChange('solvedWithCorrectComplexity', true)}
                     required
                   />
                   <span>Yes</span>
                 </div>

                 <div className="radio-option">
                   <input
                     type="radio"
                     name="solvedWithCorrectComplexity"
                     checked={!formData.solvedWithCorrectComplexity}
                     onChange={() => handleRadioChange('solvedWithCorrectComplexity', false)}
                     required
                   />
                   <span>No</span>
                 </div>
               </div>
             </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="cancel-btn"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Solve'}
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}