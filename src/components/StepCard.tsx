import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StepCardProps {
  position: number
  title: string
  description: string
  buttonText: string
  onClick?: () => void
  status?: StepStatus
};

export enum StepStatus {
  notStarted = "notStarted",
  current = "current",
  completed = "completed"
}

export const StepCard: React.FC<StepCardProps> = ({ position, title, description, buttonText, onClick, status = StepStatus.notStarted }) => {
  const classNames = {
    bg: status === StepStatus.current ? "bg-blue-700" : "bg-white",
    position: {
      bg: status === StepStatus.current ? "bg-transparent" : (status === StepStatus.completed ? "bg-blue-700" : "bg-slate-200"),
      border: status === StepStatus.current ? "border-blue-50" : (status === StepStatus.completed ? "border-blue-700" : "border-slate-200"),
      text: [StepStatus.current, StepStatus.completed].includes(status) ? "text-blue-50" : "text-slate-500"
    },
    title: status === StepStatus.current ? "text-white" : "text-slate-500",
    text: status === StepStatus.current ? "text-blue-50" : "text-slate-400",
    button: {
      bg: status === StepStatus.current ? "bg-white hover:bg-slate-100" : "bg-slate-200",
      text: status === StepStatus.current ? "text-blue-700" : "text-slate-500"
    },
  }

  return (
    <div className={`text-center rounded-lg p-6 flex flex-col justify-between space-y-6 max-w-64 shadow-md transition-all  ${classNames.bg}`}>
      <div
        className={`rounded-lg  flex justify-center items-center w-12 h-12 mr-auto ml-auto border ${classNames.position.bg} ${classNames.position.border}`}>
        <span className={`text-2xl font-bold ${classNames.position.text}`}>
          {status === StepStatus.completed ?
            <FontAwesomeIcon icon={faCheck} /> :
            position}
        </span>
      </div>

      <div>
        <h2 className={`text-xl font-bold mb-2 ${classNames.title}`}>
          {title}
        </h2>
        <p className={`text-base leading-tight mt-2 ${classNames.text}`}>
          {description}
        </p>
      </div>

      <button
        className={`w-full py-2 px-4 rounded-md focus:outline-none font-semibold transition-all ${classNames.button.bg} ${classNames.button.text}`}
        disabled={status !== StepStatus.current}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};