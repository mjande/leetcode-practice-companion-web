'use client';

import {ChangeEvent, FormEvent, useState} from "react";
import '../ProblemList.css';
import {Problem} from "@/app/types/problem";
import {MdCheckCircleOutline} from "react-icons/md";
import SolveProblemForm from "@/app/problems/solve-problem/SolveProblemForm";

export default function SolveProblemButton({ problem }: { problem: Problem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MdCheckCircleOutline onClick={() => setIsModalOpen(true)}/>

      {isModalOpen && (
        <SolveProblemForm problem={problem} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}