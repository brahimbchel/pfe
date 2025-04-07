import { Link } from "react-router";

interface PageHeaderAdminProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const PageHeaderAdmin = ({
  title,
  description,
  buttonText,
  buttonLink,
}: PageHeaderAdminProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 bg-white px-6 py-4 rounded-xl shadow-sm">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-1 text-sm">{description}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

        <Link
          to={buttonLink}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm text-center"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default PageHeaderAdmin;
