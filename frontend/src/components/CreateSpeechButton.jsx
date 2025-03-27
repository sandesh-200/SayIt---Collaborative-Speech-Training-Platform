import { Plus } from "lucide-react"
import { Link } from 'react-router-dom'
const CreateContentButton = ({
  image = null,
  size = "large", // 'small', 'medium', or 'large'
}) => {
  // Determine button size
  const buttonSize =
    {
      small: "h-12 w-12",
      medium: "h-14 w-14",
      large: "h-16 w-16",
    }[size] || "h-16 w-16"

  // Determine icon size
  const iconSize =
    {
      small: 20,
      medium: 24,
      large: 28,
    }[size] || 28

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/create"
        className={`${buttonSize} flex items-center justify-center rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105`}
        aria-label="Create Content"
      >
        {image ? (
          <img src={image || "/placeholder.svg"} alt="Create Content" className="h-1/2 w-1/2 object-contain" />
        ) : (
          <Plus size={iconSize} />
        )}
      </Link>
    </div>
  )
}

export default CreateContentButton

