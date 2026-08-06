import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams, useLocation } from 'react-router';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
// import ChatAi from '../components/ChatAi';
import Navbar from './Header';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);

  const [isRunning, setIsRunning] = useState(false);   // ✅ new
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ new

  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');

  const location = useLocation();
  const problemNumber = location.state?.problemNumber;

  const editorRef = useRef(null);
  let { problemId } = useParams();
  const { handleSubmit } = useForm();

  // FETCH PROBLEM
  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);

        const initialCode = response.data.startCode.find(
          sc => sc.language === langMap[selectedLanguage]
        )?.initialCode || '';

        setProblem(response.data);
        setCode(initialCode);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchProblem();
  }, [problemId]);

  // CHANGE LANGUAGE
  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(
        sc => sc.language === langMap[selectedLanguage]
      )?.initialCode || '';
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  // RUN CODE
  const handleRun = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setRunResult(null);

    try {
      const res = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      // console.log("RUN RESULT:", res.data); // ✅ debug

      setRunResult(res.data);
      setActiveRightTab('testresult');
    } catch (err) {
      // console.error(err);
      setRunResult({ success: false });
    }

    setIsRunning(false);
  };

  // SUBMIT CODE
  const handleSubmitCode = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await axiosClient.post(`/submission/submit/${problemId}`, {
        code,
        language: selectedLanguage
      });

      // console.log("SUBMIT RESULT:", res.data);

      setSubmitResult(res.data);
      setActiveRightTab('result');
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch ((difficulty || "").toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400 border border-green-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500';
      case 'hard': return 'bg-red-500/20 text-red-400 border border-red-500';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading && !problem) {
    return <div className="h-screen flex justify-center items-center text-white sm:overflow-y-scroll">Loading...</div>;
  }

  return (
    <div className=" h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">

      {/* HEADER */}
      <Navbar />

     {/* <div className=" flex flex-col lg:flex-row flex-1 overflow-hidden"> */}
     <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-72px)]">

        {/* LEFT PANEL */}
{/* <div className="w-1/2 flex flex-col  bg-gray-900 border-r border-gray-700 overflow-y-auto"> */}
<div className="w-full lg:w-1/2 h-auto pb-4 lg:h-full flex flex-col bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-700">
  {/* Tabs */}
  <div className="flex gap-3 p-3 bg-gray-800 border-b border-gray-700">
    {['description', 'editorial', 'solutions', 'submissions', ].map(tab => (
      <button
        key={tab}
        onClick={() => setActiveLeftTab(tab)}
        className={`px-3 py-1 rounded ${
          activeLeftTab === tab
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Content */}
  <div className="p-5 overflow-y-auto flex-1">

    {/* DESCRIPTION */}
    {problem && activeLeftTab === 'description' && (
      <>
        <div className="flex items-center gap-4 mb-5">
          <h1 className="text-xl font-bold">
            {problemNumber}. {problem.title}
          </h1>
          <span className={`px-2 py-1 text-sm rounded ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>

        <p className="text-gray-300 whitespace-pre-wrap">
          {problem.description}
        </p>

        <div className="mt-6 space-y-4">
          {problem.visibleTestCases?.map((ex, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded border border-gray-700">
              <p><b>Input:</b> {ex.input}</p>
              <p><b>Output:</b> {ex.output}</p>
            </div>
          ))}
        </div>
      </>
    )}
{activeLeftTab === 'editorial' && (
  <div className="space-y-4">

    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-white">📘 Editorial</h2>
    </div>

    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-inner">
      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
        {problem?.editorial || 'Editorial will be available soon.'}
      </p>
    </div>

    {/* Optional Tip Box */}
    <div className="bg-indigo-900/30 border border-indigo-500 p-4 rounded-lg">
      <p className="text-indigo-300 text-sm">
        💡 Tip: Try solving the problem yourself before reading the editorial.
      </p>
    </div>

  </div>
)}
    
    {activeLeftTab === 'solutions' && (
  <div className="space-y-6">

    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-white">💻 Solutions</h2>
    </div>

    {problem?.referenceSolution?.length > 0 ? (
      <div className="space-y-6">

        {problem.referenceSolution.map((solution, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-xl overflow-hidden shadow-lg"
          >

            {/* Header */}
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold text-green-400">
                {solution?.language}
              </h3>

              {/* Copy Button */}
              <button
                onClick={() => navigator.clipboard.writeText(solution?.completeCode)}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                Copy
              </button>
            </div>

            {/* Code */}
            <div className="bg-black p-4 text-sm overflow-x-auto">
              <pre className="text-white-300">
                <code>{solution?.completeCode}</code>
              </pre>
            </div>

          </div>
        ))}

      </div>
    ) : (
      <div className="bg-yellow-900/30 border border-yellow-500 p-4 rounded-lg">
        <p className="text-yellow-300">
          🚧 Solutions will be available after you solve the problem.
        </p>
      </div>
    )}

  </div>
)}

    {/* SUBMISSIONS */}
    {activeLeftTab === 'submissions' && (
      <SubmissionHistory problemId={problemId} />
    )}

    {/* CHAT AI
    {activeLeftTab === 'chatAI' && (
      <ChatAi problem={problem} />
    )} */}

  </div>
</div>

        {/* RIGHT PANEL */}
        {/* <div className="w-1/2 flex flex-col  overflow-hidden "> */}
<div className="w-full lg:w-1/2 h-[100vh] lg:h-full flex flex-col overflow-hidden bg-black ">
          <div className="flex gap-3 p-3 bg-gray-800 border-b border-gray-700">
            {['code', 'testcase', 'testresult', 'result'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveRightTab(tab)}
                className={`px-3 py-1 rounded ${
                  activeRightTab === tab
                    ? 'bg-gray-500'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CODE */}
          {activeRightTab === 'code' && (
            <div className="flex flex-col flex-1">

              <div className="p-3 flex gap-2 border-b border-gray-700">
                {['javascript', 'java', 'cpp'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded ${
                      selectedLanguage === lang
                        ? 'bg-purple-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <Editor
                height="100%"
                language={selectedLanguage}
                value={code}
                onChange={(v) => setCode(v || '')}
                theme="vs-dark"
              />

              <div className="p-3 flex justify-end gap-3 border-t border-gray-700">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className={`px-4 py-1 rounded ${
                    isRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'
                  }`}
                >
                  {isRunning ? "Running..." : "Run"}
                </button>

                <button
                  onClick={handleSubmitCode}
                  disabled={isSubmitting}
                  className={`px-4 py-1 rounded ${
                    isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}

          {/* TESTCASES */}
          {activeRightTab === 'testcase' && (
            <div className="p-4 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Example Testcases</h2>

              {problem?.visibleTestCases?.length > 0 ? (
                problem.visibleTestCases.map((tc, i) => (
                  <div key={i} className="bg-gray-800 p-4 mb-3 rounded border border-gray-700">
                    <p><b>Input:</b> {tc.input}</p>
                    <p><b>Expected:</b> {tc.output}</p>
                  </div>
                ))
              ) : (
                <p>No testcases available</p>
              )}
            </div>
          )}

          {/* TEST RESULT */}
         
          {activeRightTab === 'testresult' && (
  <div className="p-4 overflow-y-auto">

    {runResult?.testCases ? (
      runResult.testCases.map((tc, i) => {
        const expected = problem?.visibleTestCases?.[i]?.output || "N/A";
        const isCorrect = tc.stdout?.trim() === expected?.trim();

        return (
          <div
            key={i}
            className={`p-4 mb-3 rounded border ${
              isCorrect
                ? 'bg-green-900/30 border-green-600'
                : 'bg-red-900/30 border-red-600'
            }`}
          >
            <p><b>Input:</b> {tc.stdin}</p>
            <p><b>Expected:</b> {expected}</p>
            <p><b>Your Output:</b> {tc.stdout}</p>

            {/* ✅ RESULT BADGE */}
            <p className={`mt-2 font-semibold ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? "✔ Correct" : "✖ Wrong"}
            </p>
          </div>
        );
      })
    ) :( <div className="   ml-[10%] mr-[10%] rounded-lg border border-slate-700 bg-slate-900 p-8 text-center">
  <div className="text-5xl mb-4">💻</div>

  <h2 className="text-2xl font-bold text-white">
    Ready to Execute
  </h2>

  <p className="mt-3 text-gray-400 max-w-md mx-auto">
    Run your solution to verify it against the provided sample test cases.
    The execution output, runtime status, and any errors will appear here.
  </p>

  <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2 text-sm text-gray-300 border border-slate-700">
    ⚡ Waiting for execution...
  </div>
</div>)}

  </div>
)}


          {/* RESULT */}
          {/* {activeRightTab === 'result' && (
            <div className="p-4">
              {submitResult && (
                <div className={`p-4 rounded ${
                  submitResult.accepted
                    ? 'bg-green-900/30 border border-green-600'
                    : 'bg-red-900/30 border border-red-600'
                }`}>
                  {submitResult.accepted ? "Accepted 🎉" : "Failed ❌"}
                </div>
              )}
            </div>
          )} */}



        {activeRightTab === "result" && (
  <div className="p-5">

    {submitResult ? (
      <div
        className={`rounded-xl border p-6 ${
          submitResult.accepted
            ? "border-green-500 bg-green-900/20"
            : "border-red-500 bg-red-900/20"
        }`}
      >
        <div className="flex items-center gap-3">
             {console.log(submitResult)}
          <div className="text-5xl">
            {submitResult.accepted ? "🎉" : "❌"}
          </div>

          <div>
            <h2
              className={`text-2xl font-bold ${
                submitResult.accepted
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {submitResult.accepted
                ? "Accepted"
                : "Wrong Answer"}
            </h2>

            <p className="text-gray-400 mt-1">
              {submitResult.accepted
                ? "Congratulations! All test cases passed."
                : "Your solution failed one or more test cases."}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded bg-slate-800 p-4">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-lg font-semibold text-white">
              {submitResult.accepted ? "Success" : "Failed"}
            </p>
          </div>

          <div className="rounded bg-slate-800 p-4">
            <p className="text-gray-400 text-sm">Passed</p>
            <p className="text-lg font-semibold text-white">
              {submitResult.passedTestCases || "--"} /{" "}
              {submitResult.totalTestCases|| "--"}
            </p>
          </div>

          <div className="rounded bg-slate-800 p-4">
            <p className="text-gray-400 text-sm">Runtime</p>
            <p className="text-lg font-semibold text-white">
              {submitResult.runtime || "--"} ms
            </p>
          </div>

          <div className="rounded bg-slate-800 p-4">
            <p className="text-gray-400 text-sm">Memory</p>
            <p className="text-lg font-semibold text-white">
              {submitResult.memory || "--"} MB
            </p>
          </div>

        </div>
      </div>
    ) : (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-8 text-center">
        <div className="text-5xl mb-3">🚀</div>
        <h2 className="text-xl font-semibold text-white">
          Submit your solution
        </h2>
        <p className="mt-2 text-gray-400">
          Run your code against all hidden test cases to check if your solution is accepted.
        </p>
      </div>
    )}

  </div>
)}




        </div>
      </div>
    </div>
  );
};

export default ProblemPage;









