import SpeechCreationForm from "../components/CreateSpeech"
import SpeechCollection from "../components/SpeechCollection"

const Speech = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Speeches</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Speech Creation Form */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <SpeechCreationForm />
          </div>

          {/* Speech Collection */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <SpeechCollection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Speech

