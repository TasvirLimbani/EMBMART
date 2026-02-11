import { useMemo } from "react"

export default function DownloadButton({ downloadDate, fileUrl, fileName }) {
    const canDownload = useMemo(() => {
        if (!downloadDate) return false

        const downloadTime = new Date(downloadDate).getTime()
        const now = Date.now()

        const daysPassed = (now - downloadTime) / (1000 * 60 * 60 * 24)
        return daysPassed < 7
    }, [downloadDate])

    if (!canDownload) return null

    const handleDownload = async (e) => {
        e.preventDefault()
        e.stopPropagation() // 🔥 VERY IMPORTANT (stops navigation)

        const response = await fetch(`/api/download?file=${fileUrl.trim()}`)
        const blob = await response.blob()

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")

        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()

        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }

    return (
        <button
            onClick={handleDownload}
            className="mt-2 w-full text-xs border rounded-md py-1 hover:bg-muted"
        >
            Download Again
        </button>
    )
}
