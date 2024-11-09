export default function Widget() {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Programs To Help You Upskill</h2>
        <div className="flex justify-center mb-4">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-secondary/80">Online Programs</button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-secondary/80 ml-4">On-Campus Programs</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img undefinedhidden="true" alt="Academy (Software Development)" src="https://placehold.co/100x100?text=Code" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold">Academy (Software Development)</h3>
            <p className="text-sm mt-2">Min. work exp: 1 year</p>
            <p className="text-sm">Duration: 9-12 months</p>
            <p className="text-sm">1 Capstone project</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img undefinedhidden="true" alt="Data Science & Machine Learning" src="https://placehold.co/100x100?text=Data" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold">Data Science & Machine Learning</h3>
            <p className="text-sm mt-2">Min. work exp: 1 year</p>
            <p className="text-sm">Duration: 12-18 months</p>
            <p className="text-sm">50+ real-world assignments</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img undefinedhidden="true" alt="DevOps" src="https://placehold.co/100x100?text=DevOps" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold">DevOps</h3>
            <p className="text-sm mt-2">Min. work exp: 1 year</p>
            <p className="text-sm">Duration: 12-16 months</p>
            <p className="text-sm">50+ real-world assignments</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img undefinedhidden="true" alt="Bachelor's + Master's Program" src="https://placehold.co/100x100?text=Degree" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold">Bachelor's + Master's Program</h3>
            <p className="text-sm mt-2">Completed 12th grade</p>
            <p className="text-sm">3 years + 1-year internship</p>
            <p className="text-sm">Fully residential in Bangalore</p>
          </div>
        </div>
      </div>
    )
  }