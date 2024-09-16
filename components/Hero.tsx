"use client"
import { Button } from "@/components/ui/button";
import { codeGen, whichLanguage } from "@/utils/codeGen";
import { useState } from "react";

import CodeSnippet from "@/components/CodeSnippet";


const languages = ['javascript', 'python', 'c', 'c++','java']
const topics = ['React', 'AI/ML', 'Data Structures(java)']

export default function Hero() {
    const [code, setCode] = useState("")
    const [topic, setTopic] = useState("java")
    const [isGenerated, setIsGenerated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(topic: string) {
        setTopic(topic)
        setIsLoading(true)
        try {
            let res = await codeGen(topic);
            if (res) {
                res = res.replace("```" + topic, "")
                res = res.replace("```", "")
                setCode(res)
                setIsGenerated(true)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleTopics(topic: string) {
        topic = whichLanguage(topic) as string
        setIsLoading(true)
        setTopic(topic)
        try {
            let res = await codeGen(topic);
            if (res) {
                res = res.replace("```" + whichLanguage(topic), "")
                res = res.replace("```", "")
                setCode(res)
                setIsGenerated(true)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className="pt-20 flex flex-col items-center">
            <div className="space-y-4">
                <div className="flex gap-8 px-8">
                    <h1 className="text-2xl font-semibold">Language based</h1>
                    {languages?.map((item,idx) => {
                        return <Button key={idx} onClick={() => handleClick(item)} disabled={isLoading}>{item}</Button>
                    })}
                </div>
                <div className="flex gap-8 px-8">
                    <h1 className="text-2xl font-semibold">Topic based</h1>
                    {topics?.map((item,idx) => {
                        return <Button key={idx} onClick={() => handleTopics(item)} disabled={isLoading}>{item}</Button>
                    })}
                </div>
            </div>
            <div className="pt-12">
                {
                    isGenerated ?
                        <CodeSnippet topic={topic} code={code} />
                        :
                        <div className="mt-20 text-xl border-neutral-400 border rounded-md p-4">
                            <h1>
                                Enter your choice to see snippet
                            </h1>
                        </div>
                }
            </div>
        </main>
    );
}