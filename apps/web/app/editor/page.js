"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
];

const DEFAULT_CODE = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
`,
  typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
`,
  python: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))       # [1, 2]
`,
  java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}
`,
  cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) return {map[complement], i};
        map[nums[i]] = i;
    }
    return {};
}
`,
  go: `package main

import "fmt"

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if j, ok := seen[complement]; ok {
            return []int{j, i}
        }
        seen[num] = i
    }
    return nil
}

func main() {
    fmt.Println(twoSum([]int{2, 7, 11, 15}, 9))
}
`,
  rust: `use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut map: HashMap<i32, i32> = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let complement = target - num;
        if let Some(&j) = map.get(&complement) {
            return vec![j, i as i32];
        }
        map.insert(num, i as i32);
    }
    vec![]
}

fn main() {
    println!("{:?}", two_sum(vec![2, 7, 11, 15], 9));
}
`,
};

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"
  const editorRef = useRef(null);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang] || "// Start coding...");
    setOutput(null);
    setStatus(null);
  };

  const runCode = async () => {
    setRunning(true);
    setOutput(null);
    setStatus(null);

    // Only JS can run in browser; for others simulate
    if (language === "javascript") {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.map(String).join(" "));
      try {
        // eslint-disable-next-line no-new-func
        new Function(code)();
        setOutput(logs.join("\n") || "(no output)");
        setStatus("success");
      } catch (err) {
        setOutput(err.toString());
        setStatus("error");
      } finally {
        console.log = originalLog;
      }
    } else {
      // Simulate for other languages
      await new Promise((r) => setTimeout(r, 800));
      setOutput(
        `Running ${language} is not supported in the browser.\nUse a backend execution service (e.g., Judge0 API) to run ${language} code.`
      );
      setStatus("error");
    }

    setRunning(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#0d1117",
        color: "#e6edf3",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: "#161b22",
          borderBottom: "1px solid #30363d",
          gap: 12,
        }}
      >
        {/* Problem Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              background: "#238636",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 999,
              letterSpacing: 1,
            }}
          >
            EASY
          </span>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>
            1. Two Sum
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{
              background: "#21262d",
              border: "1px solid #30363d",
              color: "#e6edf3",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>

          {/* Run Button */}
          <button
            onClick={runCode}
            disabled={running}
            style={{
              background: running ? "#238636aa" : "#238636",
              border: "none",
              color: "#fff",
              padding: "7px 20px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: running ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "background 0.2s",
              letterSpacing: 0.5,
            }}
          >
            {running ? (
              <>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    border: "2px solid #fff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                Running...
              </>
            ) : (
              <>▶ Run Code</>
            )}
          </button>

          {/* Submit Button */}
          <button
            style={{
              background: "transparent",
              border: "1px solid #30363d",
              color: "#e6edf3",
              padding: "7px 20px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 0.5,
            }}
          >
            Submit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Problem Description */}
        <aside
          style={{
            width: 340,
            background: "#0d1117",
            borderRight: "1px solid #21262d",
            padding: "20px 22px",
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
            Two Sum
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#8b949e" }}>
            Given an array of integers{" "}
            <code
              style={{
                background: "#21262d",
                padding: "1px 5px",
                borderRadius: 4,
                color: "#e6edf3",
              }}
            >
              nums
            </code>{" "}
            and an integer{" "}
            <code
              style={{
                background: "#21262d",
                padding: "1px 5px",
                borderRadius: 4,
                color: "#e6edf3",
              }}
            >
              target
            </code>
            , return indices of the two numbers such that they add up to{" "}
            <code
              style={{
                background: "#21262d",
                padding: "1px 5px",
                borderRadius: 4,
                color: "#e6edf3",
              }}
            >
              target
            </code>
            .
          </p>

          <div
            style={{
              marginTop: 20,
              borderLeft: "3px solid #30363d",
              paddingLeft: 14,
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#8b949e",
                marginBottom: 4,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              EXAMPLE 1
            </p>
            <pre
              style={{
                fontSize: 12,
                background: "#161b22",
                padding: 10,
                borderRadius: 6,
                color: "#e6edf3",
                lineHeight: 1.6,
              }}
            >
              {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explain: nums[0] + nums[1] = 2 + 7 = 9`}
            </pre>
          </div>

          <div
            style={{
              marginTop: 14,
              borderLeft: "3px solid #30363d",
              paddingLeft: 14,
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#8b949e",
                marginBottom: 4,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              EXAMPLE 2
            </p>
            <pre
              style={{
                fontSize: 12,
                background: "#161b22",
                padding: 10,
                borderRadius: 6,
                color: "#e6edf3",
                lineHeight: 1.6,
              }}
            >
              {`Input: nums = [3,2,4], target = 6
Output: [1,2]`}
            </pre>
          </div>

          <div style={{ marginTop: 20 }}>
            <p
              style={{
                fontSize: 12,
                color: "#8b949e",
                fontWeight: 600,
                marginBottom: 6,
                letterSpacing: 0.5,
              }}
            >
              CONSTRAINTS
            </p>
            <ul
              style={{
                fontSize: 12,
                color: "#8b949e",
                paddingLeft: 18,
                lineHeight: 2,
              }}
            >
              <li>
                2 ≤ nums.length ≤ 10<sup>4</sup>
              </li>
              <li>
                -10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup>
              </li>
              <li>Only one valid answer exists.</li>
            </ul>
          </div>
        </aside>

        {/* Editor + Output */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
        >
          {/* Monaco Editor */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(val) => setCode(val || "")}
              onMount={(editor) => (editorRef.current = editor)}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                lineNumbers: "on",
                renderLineHighlight: "line",
                smoothScrolling: true,
                cursorBlinking: "smooth",
                tabSize: 2,
              }}
            />
          </div>

          {/* Output Panel */}
          {output !== null && (
            <div
              style={{
                height: 160,
                background: "#0d1117",
                borderTop: "1px solid #21262d",
                padding: "12px 18px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: status === "success" ? "#3fb950" : "#f85149",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: status === "success" ? "#3fb950" : "#f85149",
                    letterSpacing: 0.8,
                  }}
                >
                  {status === "success" ? "ACCEPTED" : "RUNTIME ERROR"}
                </span>
              </div>
              <pre
                style={{
                  fontSize: 13,
                  color: status === "success" ? "#e6edf3" : "#f85149",
                  margin: 0,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
