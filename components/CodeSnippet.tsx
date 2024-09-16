import html2canvas from 'html2canvas';
import { useLayoutEffect, useState } from 'react'
import { highlight } from '@/utils/shared'
import Image from 'next/image';

const CodeSnippet = ({ topic = "java", code = "#This is a code snippet" }: { topic: string, code: string }) => {

    const captureCodeAsImage = async () => {
        const codeContainer = document.getElementById('code-container');
        const canvas = await html2canvas(codeContainer as HTMLElement);
        const image = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = image;
        link.download = 'code-snippet.png';
        link.click();
    };

    return (
        <div className="flex flex-col items-center">
            <div
                id="code-container"
                className="bg-gradient-to-br from-pink-500 to-orange-400 p-6 rounded-lg shadow-lg font-mono"
            >
                <div className="flex justify-start bg-gray-800 p-2 rounded-t-lg relative">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <Image src={'/resourcio_svg.svg'} width={50} height={50} alt='' className='absolute right-4 top-4'></Image>
                </div>
                <pre className="bg-gray-800 px-4 py-4 text-white rounded-b-lg overflow-x-auto mt-0">
                    <code className={`language-${topic?.toLowerCase()}`}>
                        <CodeBlock topic={topic} code={code} />
                    </code>
                </pre>
            </div>

            {/* Button to capture and download the code snippet as an image */}
            <button
                onClick={captureCodeAsImage}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Download as Image
            </button>
        </div>
    );
};

export default CodeSnippet;



function CodeBlock({ topic, code }: { topic: string, code: string }) {
    const [nodes, setNodes] = useState<JSX.Element>()

    useLayoutEffect(() => {
        void highlight({ code, topic }).then(res => setNodes(res)).catch(error => {
            console.log(error);
            return setNodes(undefined)
        }
        )
    }, [code, topic])

    return nodes ? nodes : <p>Loading...</p>
}
