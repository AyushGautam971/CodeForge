


// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';


// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);

//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all'
//   });

//   // ✅ Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const problemsPerPage = 2;

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//          // ✅ ADD NUMBER HERE
//     const numberedProblems = data.map((p, i) => ({
//       ...p,
//       number: i + 1,
//     }))
//       setProblems(numberedProblems)
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//     else setSolvedProblems([]);
//   }, [user]);

//   // ✅ Reset page on filter change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filters]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]);
//   };

//   // ✅ Filtering
//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch =
//       filters.difficulty === 'all' ||
//       problem.difficulty === filters.difficulty;

//     const tagMatch =
//       filters.tag === 'all' ||
//       problem.tags === filters.tag;

//     const isSolved = solvedProblems.some(sp => sp._id === problem._id);

//     const statusMatch =
//       filters.status === 'all' ||
//       (filters.status === 'solved' && isSolved);

//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   // ✅ Pagination Logic
//   const indexOfLast = currentPage * problemsPerPage;
//   const indexOfFirst = indexOfLast - problemsPerPage;
//   const currentProblems = filteredProblems.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

//   return (
//     <div className="min-h-screen bg-base-200">

//       {/* Navbar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">
//             LeetCode
//           </NavLink>
//         </div>

//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName || "Guest"}
//             </div>

//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>

//               {user?.role === 'admin' && (
//                 <li>
//                   <NavLink to="/admin">Admin</NavLink>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main */}
//       <div className="container mx-auto p-4">

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">

//           <select
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) =>
//               setFilters({ ...filters, status: e.target.value })
//             }
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) =>
//               setFilters({ ...filters, difficulty: e.target.value })
//             }
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) =>
//               setFilters({ ...filters, tag: e.target.value })
//             }
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems */}
//         <div className="grid gap-4">
//           {currentProblems.map((problem,index) => {
//             console.log(problem);
//             const isSolved = solvedProblems.some(
//               sp => sp._id === problem._id
//             );

//             return (
//               <div key={problem._id} className="card bg-base-100 shadow-xl">
//                 <div className="card-body">

//                   <div className="flex items-center justify-between">
//                     <h2 className="card-title">
//                       <NavLink
//                         to={`/problem/${problem._id}`}  
//                         state={{ problemNumber: problem.number }}
//                         className="hover:text-primary"
//                       >
//                       {problem.number}.  {problem.title}
//                       </NavLink>
//                     </h2>

//                     {isSolved && (
//                       <div className="badge badge-success gap-2">
//                         ✔ Solved
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex gap-2">
//                     <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                       {problem.difficulty}
//                     </div>
//                     <div className="badge badge-info">
//                       {problem.tags}
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-4 mt-6">

//           <button
//             className="btn btn-sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(prev => prev - 1)}
//           >
//             Prev
//           </button>

//           <span className="font-semibold">
//             Page {currentPage} of {totalPages || 1}
//           </span>

//           <button
//             className="btn btn-sm"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(prev => prev + 1)}
//           >
//             Next
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default Homepage;

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import Navbar from './Header';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });

  // ✅ Search state
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 5;

  // ✅ Fetch problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');

        // ✅ Add stable numbering
        const numberedProblems = data.map((p, i) => ({
          ...p,
          number: i + 1
        }));

        setProblems(numberedProblems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
    else setSolvedProblems([]);

  }, [user]);

  // ✅ Reset page when filters/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  // ✅ Filtering + Search
  const filteredProblems = problems.filter(problem => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      query === '' ||
      problem.title.toLowerCase().includes(query) ||
      problem.number.toString().includes(query);

    const difficultyMatch =
      filters.difficulty === 'all' ||
      problem.difficulty === filters.difficulty;

    const tagMatch =
      filters.tag === 'all' ||
      problem.tags === filters.tag;

    const isSolved = solvedProblems.some(sp => sp._id === problem._id);

    const statusMatch =
      filters.status === 'all' ||
      (filters.status === 'solved' && isSolved);

    return matchesSearch && difficultyMatch && tagMatch && statusMatch;
  });

  // ✅ Pagination logic
  const indexOfLast = currentPage * problemsPerPage;
  const indexOfFirst = indexOfLast - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  return (
    <div className="min-h-screen bg-base-200">

      {/* Navbar */}
      {/* <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl">
            LeetCode
          </NavLink>
        </div>

        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost">
              {user?.firstName || "Guest"}
            </div>

            <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>

              {user?.role === 'admin' && (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav> */}
      <Navbar/>

      {/* Main */}
      <div className="container mx-auto p-4">

        {/* 🔍 SEARCH BAR */}
        <input
          type="text"
          placeholder="Search by name or problem number..."
          className="input input-bordered w-full max-w-md mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">

          <select
            className="select select-bordered"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select
            className="select select-bordered"
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="select select-bordered"
            value={filters.tag}
            onChange={(e) =>
              setFilters({ ...filters, tag: e.target.value })
            }
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>
        </div>

        {/* Problems */}
        <div className="grid gap-4">
          {currentProblems.map((problem) => {
            const isSolved = solvedProblems.some(
              sp => sp._id === problem._id
            );

            return (
              <div key={problem._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">

                  <div className="flex items-center justify-between">
                    <h2 className="card-title">
                      <NavLink
                        to={`/problem/${problem._id}`}
                        state={{ problemNumber: problem.number }}
                        className="hover:text-primary"
                      >
                        {problem.number}. {problem.title}
                      </NavLink>
                    </h2>

                    {isSolved && (
                      <div className="badge badge-success gap-2">
                        ✔ Solved
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </div>
                    <div className="badge badge-info">
                      {problem.tags}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ❌ No Results */}
        {currentProblems.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            No problems found 😢
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'badge-success';
    case 'medium': return 'badge-warning';
    case 'hard': return 'badge-error';
    default: return 'badge-neutral';
  }
};

export default Homepage;