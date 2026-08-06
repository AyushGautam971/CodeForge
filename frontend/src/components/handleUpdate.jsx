import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

// Schema
const problemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string()
    })
  ),
  hiddenTestCases: z.array(
    z.object({
      input: z.string(),
      output: z.string()
    })
  ),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string()
    })
  ),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string()
    })
  )
});

function AdminUpdateForm({ problem }) {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: problem
  });

  // important for prefill
  useEffect(() => {
    if (problem) {
      reset(problem);
    }
  }, [problem]);

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } =
    useFieldArray({ control, name: 'visibleTestCases' });

  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } =
    useFieldArray({ control, name: 'hiddenTestCases' });

  const onSubmit = async (data) => {
    try {
      await axiosClient.put(`/problem/update/${problem._id}`, data);
      alert('Problem updated successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  if (!problem) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Problem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* BASIC */}
        <div className="card p-6 shadow-lg">
          <input {...register('title')} placeholder="Title" className="input input-bordered w-full mb-3" />
          <textarea {...register('description')} className="textarea textarea-bordered w-full mb-3" />

          <select {...register('difficulty')} className="select select-bordered w-full mb-3">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select {...register('tags')} className="select select-bordered w-full">
            <option value="array">Array</option>
            <option value="linkedList">LinkedList</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>
        </div>

        {/* VISIBLE TEST CASES */}
        <div className="card p-6 shadow-lg">
          <h2>Visible Test Cases</h2>
          <button type="button" onClick={() => appendVisible({ input: '', output: '', explanation: '' })}>
            Add
          </button>

          {visibleFields.map((field, i) => (
            <div key={field.id}>
              <input {...register(`visibleTestCases.${i}.input`)} placeholder="input" />
              <input {...register(`visibleTestCases.${i}.output`)} placeholder="output" />
              <input {...register(`visibleTestCases.${i}.explanation`)} placeholder="explanation" />
              <button type="button" onClick={() => removeVisible(i)}>Remove</button>
            </div>
          ))}
        </div>

        {/* HIDDEN TEST CASES */}
        <div className="card p-6 shadow-lg">
          <h2>Hidden Test Cases</h2>
          <button type="button" onClick={() => appendHidden({ input: '', output: '' })}>
            Add
          </button>

          {hiddenFields.map((field, i) => (
            <div key={field.id}>
              <input {...register(`hiddenTestCases.${i}.input`)} placeholder="input" />
              <input {...register(`hiddenTestCases.${i}.output`)} placeholder="output" />
              <button type="button" onClick={() => removeHidden(i)}>Remove</button>
            </div>
          ))}
        </div>

        {/* CODE */}
        <div className="card p-6 shadow-lg">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <h3>{['C++', 'Java', 'JS'][i]}</h3>
              <textarea {...register(`startCode.${i}.initialCode`)} />
              <textarea {...register(`referenceSolution.${i}.completeCode`)} />
            </div>
          ))}
        </div>

        <button className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
}

export default AdminUpdateForm;