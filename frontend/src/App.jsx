import { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";
import "./App.css";

function App() {
    const [code, setCode] = useState(`function sum(a, b) {
    return a + b;
}`);

    const [review, setReview] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [fixing, setFixing] = useState(false);
    const [language, setLanguage] = useState("JavaScript");
    const [isLightMode, setIsLightMode] = useState(false);

    // =========================
    // AI REVIEW
    // =========================

    async function reviewCode() {
        try {
            setLoading(true);
            setReview("");

            const response = await axios.post(
                "http://localhost:3000/ai/get-review",
                {
                    code
                }
            );

            setReview(
                typeof response.data === "string"
                    ? response.data
                    : response.data.review || JSON.stringify(response.data)
            );

        } catch (error) {
            console.error(error);

            setReview(
                error.response?.data?.message ||
                "Failed to get code review."
            );

        } finally {
            setLoading(false);
        }
    }

    // =========================
    // RUN CODE
    // =========================

    function runCode() {
        setOutput("");

        const logs = [];
        const originalLog = console.log;

        try {
            console.log = (...args) => {
                logs.push(
                    args
                        .map((arg) =>
                            typeof arg === "object"
                                ? JSON.stringify(arg)
                                : String(arg)
                        )
                        .join(" ")
                );
            };

            const execute = new Function(code);

            execute();

            setOutput(
                logs.length
                    ? logs.join("\n")
                    : "Code executed successfully with no output."
            );

        } catch (error) {
            setOutput(`Error: ${error.message}`);

        } finally {
            // Always restore console.log
            console.log = originalLog;
        }
    }

    // =========================
    // FIX CODE
    // =========================

    async function fixCode() {
        try {
            setFixing(true);
            setOutput("");

            const response = await axios.post(
                "http://localhost:3000/ai/fix-code",
                {
                    code,
                    language
                }
            );

            const fixedCode =
                typeof response.data === "string"
                    ? response.data
                    : response.data.code || response.data.fixedCode;

            if (fixedCode) {
                setCode(fixedCode);
                setOutput("✨ Code fixed successfully.");
            } else {
                setOutput("Could not find corrected code in the response.");
            }

        } catch (error) {
            console.error(error);

            setOutput(
                error.response?.data?.message ||
                "Failed to fix code."
            );

        } finally {
            setFixing(false);
        }
    }

    // =========================
    // CLEAR
    // =========================

    function clearCode() {
        setCode("");
        setReview("");
        setOutput("");
    }

    // =========================
    // LIGHT / DARK MODE
    // =========================

    function toggleTheme() {
        setIsLightMode((previous) => !previous);
    }

    // =========================
    // GITHUB
    // =========================

    function openGitHub() {
        window.open(
            "https://github.com/Tanya6730",
            "_blank",
            "noopener,noreferrer"
        );
    }

    // =========================
    // COPY CODE
    // =========================

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(code);
            setOutput("📋 Code copied to clipboard.");
        } catch (error) {
            console.error(error);
            setOutput("Failed to copy code.");
        }
    }

    return (
        <div className={`app ${isLightMode ? "light-mode" : "dark-mode"}`}>

            {/* =========================
                NAVBAR
            ========================= */}

            <header className="navbar">

                <div className="brand">

                    <div className="brand-icon">
                        ◈
                    </div>

                    <span>CodeLens</span>

                    <span className="brand-ai">
                        AI
                    </span>

                </div>


                <div className="nav-right">

                    <button
                        className="icon-button"
                        onClick={toggleTheme}
                        title={
                            isLightMode
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                    >
                        {isLightMode ? "🌙" : "☀"}
                    </button>


                    <button
                        className="nav-button"
                        onClick={openGitHub}
                    >
                        GitHub
                    </button>

                </div>

            </header>


            {/* =========================
                TOOLBAR
            ========================= */}

            <div className="toolbar">

                <div className="language-select">

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option>JavaScript</option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>C++</option>
                        <option>TypeScript</option>
                    </select>

                </div>


                <div className="toolbar-actions">

                    {/* RUN */}

                    <button
                        className="btn run-btn"
                        onClick={runCode}
                    >
                        ▶ Run
                    </button>


                    {/* FIX */}

                    <button
                        className="btn fix-btn"
                        onClick={fixCode}
                        disabled={fixing}
                    >
                        {fixing ? "✨ Fixing..." : "✨ Fix Code"}
                    </button>


                    {/* REVIEW */}

                    <button
                        className="btn review-btn"
                        onClick={reviewCode}
                        disabled={loading}
                    >
                        {loading ? "Reviewing..." : "Review"}
                    </button>


                    {/* COPY */}

                    <button
                        className="btn"
                        onClick={copyCode}
                    >
                        📋 Copy
                    </button>


                    {/* CLEAR */}

                    <button
                        className="btn clear-btn"
                        onClick={clearCode}
                    >
                        Clear
                    </button>

                </div>

            </div>


            {/* =========================
                MAIN WORKSPACE
            ========================= */}

            <main className="workspace">

                {/* CODE PANEL */}

                <section className="panel code-panel">

                    <div className="panel-header">

                        <div className="panel-title">

                            <span className="status-dot"></span>

                            Editor

                        </div>

                        <span className="file-name">
                            main.js
                        </span>

                    </div>


                    <div className="editor">

                        <div className="line-numbers">

                            {code.split("\n").map((_, index) => (
                                <div key={index}>
                                    {index + 1}
                                </div>
                            ))}

                        </div>


                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck="false"
                            className="code-input"
                        />

                    </div>

                </section>


                {/* REVIEW PANEL */}

                <section className="panel review-panel">

                    <div className="panel-header">

                        <div className="panel-title">

                            <span className="ai-dot">
                                ✦
                            </span>

                            AI Review

                        </div>


                        {review && (

                            <button
                                className="copy-button"
                                onClick={() =>
                                    navigator.clipboard.writeText(review)
                                }
                            >
                                Copy
                            </button>

                        )}

                    </div>


                    <div className="review-content">

                        {!review && !loading && (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    ✦
                                </div>

                                <h3>
                                    Ready to review
                                </h3>

                                <p>
                                    Write or paste your code and click
                                    <strong> Review </strong>
                                    to get AI-powered feedback.
                                </p>

                            </div>

                        )}


                        {loading && (

                            <div className="loading-state">

                                <div className="loader"></div>

                                <p>
                                    Analyzing your code...
                                </p>

                            </div>

                        )}


                        {review && !loading && (

                            <Markdown
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {review}
                            </Markdown>

                        )}

                    </div>

                </section>

            </main>


            {/* =========================
                CONSOLE
            ========================= */}

            <section className="console">

                <div className="console-header">

                    <span>
                        Console
                    </span>


                    <button
                        onClick={() => setOutput("")}
                    >
                        Clear
                    </button>

                </div>


                <div className="console-output">

                    {output ? (

                        <pre>
                            {output}
                        </pre>

                    ) : (

                        <span className="console-placeholder">
                            &gt; Output will appear here...
                        </span>

                    )}

                </div>

            </section>

        </div>
    );
}

export default App;