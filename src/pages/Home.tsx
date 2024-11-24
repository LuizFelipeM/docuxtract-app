import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StepCard, StepStatus } from '../components/StepCard';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()

  const [status, setStatus] = useState({ step1: StepStatus.notStarted, step2: StepStatus.notStarted })

  useEffect(() => {
    const step1 = getStepStatus(1)
    const step2 = getStepStatus(2)

    setStatus({
      step1: step1 === StepStatus.notStarted && step2 === StepStatus.notStarted ? StepStatus.current : step1,
      step2: step2
    })
  }, [])


  const getStepStatus = (step: number): StepStatus => {
    const status = localStorage.getItem(`step${step}Status`)
    if (status) return StepStatus[status as keyof typeof StepStatus]
    return StepStatus.notStarted
  }

  return (
    <div className="min-h-full flex items-center justify-center flex-col">
      <div className="mb-6 text-center">
        <h1 className="text-5xl font-bold mb-2">{t("welcome")}</h1>
        <p className="text-2xl">{t("beforeStartSubtitle")}</p>
      </div>

      <div>
        <div className="grid gap-6 md:grid-cols-2">
          <StepCard
            position={1}
            title={t("step1Title")}
            description={t("step1Description")}
            buttonText={t("step1Button")}
            onClick={() => {
              localStorage.setItem("step1Status", StepStatus.completed)
              localStorage.setItem("step2Status", StepStatus.current)
              navigate("/schemas/new")
            }}
            status={status.step1}
          />
          <StepCard
            position={2}
            title={t("step2Title")}
            description={t("step2Description")}
            buttonText={t("step2Button")}
            onClick={() => {
              localStorage.setItem("step2Status", StepStatus.completed)
              navigate("/extraction")
            }}
            status={status.step2}
          />
        </div>
      </div>
    </div>
  );
};
