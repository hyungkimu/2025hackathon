import { FileText, CheckCircle, AlertCircle, Circle } from "lucide-react";

type QuizStatus = "correct" | "partial" | "unsubmitted";

type Props = {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  status: QuizStatus;
};

export function QuizList({ quizs }: { quizs: Props[] }) {
  return (
    <div className="space-y-4">
      {quizs.length === 0 ? (
        <div className="text-center text-muted-foreground p-6 border rounded-md">
          아직 생성된 퀴즈가 없습니다. <br /> 새로운 퀴즈를 만들어보세요.
        </div>
      ) : ( quizs.map((quiz) => (
        <div
          key={quiz.id}
          className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted cursor-pointer">
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10 text-primary"  strokeWidth={0.5} />
            <div>
              <p className="font-semibold text-base md:text-base">{quiz.title}</p>
              <p className="text-sm text-muted-foreground">{quiz.description}</p>
              <p className="text-xs text-muted-foreground">문항 수: {quiz.totalQuestions}</p>
            </div>
          </div>
          <div className="flex items-center">
            {quiz.status === "correct" && <CheckCircle className="w-6 h-6 text-green-500" />}
            {quiz.status === "partial" && <AlertCircle className="w-6 h-6 text-yellow-500" />}
            {quiz.status === "unsubmitted" && <Circle className="w-6 h-6 text-gray-400" />}
          </div>
        </div>
      ))
      )}

      {/* 퀴즈 생성 버튼 */}
      <button
        // onClick={onCreateQuiz}
        className="w-full border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:border-primary hover:text-primary text-sm font-medium"
      >
        + 퀴즈 생성
      </button>
    </div>
  );
}