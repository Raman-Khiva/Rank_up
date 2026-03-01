// app/editor/page.tsx
"use client";
import Editor from "@monaco-editor/react"
import dynamic from "next/dynamic";
/*
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});
*/
export default function Page() {
  return (
    <div className="h-screen p-4">
     <Editor 
        height="80vh"
        defaultLanguage="javascript"
        defaultValue="// Start coding here..."
        theme="vs-dark"
      />
    </div>
  );
}


