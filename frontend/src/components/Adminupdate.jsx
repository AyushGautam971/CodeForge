import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'
import AdminUpdateForm from './handleUpdate';

const AdminUpdate = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
    if (selectedProblem) {
    return <AdminUpdateForm problem={selectedProblem} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Update Problems</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="w-1/12">#</th>
              <th className="w-4/12">Title</th>
              <th className="w-2/12">Difficulty</th>
              <th className="w-3/12">Tags</th>
              <th className="w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem._id}>
                <th>{index + 1}</th>
                <td>{problem.title}</td>
                <td>
                  
                  <span
  className={`px-5 py-2 rounded-2xl text-sm font-semibold ${
    problem.difficulty === 'easy'
      ? 'btn btn-success'
      : problem.difficulty === 'medium'
      ? 'btn btn-warning'
      : 'btn btn-error'
  }`}
>
  {problem.difficulty}
</span>

     </td>
                <td>
                  <span className="badge badge-outline">
                    {problem.tags}
                  </span>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button 
                         onClick={() => setSelectedProblem(problem)}
                      className="btn btn-sm bg-amber-300 text-black font-bold "
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUpdate;

// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient';
// import AdminUpdateForm from './handleUpdate';

// const AdminUpdate = () => {
//   const [problems, setProblems] = useState([]);
//   const [selectedProblem, setSelectedProblem] = useState(null);

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     const { data } = await axiosClient.get('/problem/getAllProblem');
//     setProblems(data);
//   };

//   if (selectedProblem) {
//     return <AdminUpdateForm problem={selectedProblem} />;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl">All Problems</h1>

//       {problems.map((p) => (
//         <div key={p._id} className="flex justify-between p-4 border">
//           <span>{p.title}</span>

//           <button
//             className="btn btn-warning"
//             onClick={() => setSelectedProblem(p)}
//           >
//             Edit
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminUpdate;