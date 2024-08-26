import { Editor, Verbosity, WordComplexity } from '@prisma/client'

import { Badge } from '../atoms/badge'

const wordComplexityIndices = {
    [WordComplexity.ELEMENTARY]: 1,
    [WordComplexity.INTERMEDIATE]: 2,
    [WordComplexity.SOPHISTICATED]: 3,
}

const verbosityIndices = {
    [Verbosity.SUCCINCT]: 1,
    [Verbosity.MODERATE]: 2,
    [Verbosity.ELABORATE]: 3,
}

export const EditorInfo = ({
    editor,
}: {
    editor: Pick<Editor, 'style' | 'wordComplexity' | 'verbosity' | 'language'>
}) => {
    return (
        <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
                <span className="font-semibold text-gray-600 dark:text-gray-300">Style:</span>
                <Badge variant="secondary" className="ml-2 capitalize">
                    {editor.style.split('_').join(' ').toLowerCase()}
                </Badge>
            </div>
            <div>
                <span className="font-semibold text-gray-600 dark:text-gray-300">Language:</span>
                <Badge variant="secondary" className="ml-2 capitalize">
                    {editor.language.toLowerCase()}
                </Badge>
            </div>
            <div className="col-span-2">
                <span className="font-semibold text-gray-600 dark:text-gray-300">Verbosity:</span>
                <div className="mt-1 flex space-x-1">
                    {[1, 2, 3].map((level) => (
                        <div
                            key={level}
                            className={`h-2 w-8 rounded ${level <= verbosityIndices[editor.verbosity] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
            </div>
            <div className="col-span-2">
                <span className="font-semibold text-gray-600 dark:text-gray-300">Word Complexity:</span>
                <div className="mt-1 flex space-x-1">
                    {[1, 2, 3].map((level) => (
                        <div
                            key={level}
                            className={`h-2 w-8 rounded ${level <= wordComplexityIndices[editor.wordComplexity] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
