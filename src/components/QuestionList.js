import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then((r)=> r.json())
    .then((q)=> setQuestions(q));
  }, []);

  function handleDelete(deleted) {
    const updatedQuestions = questions.filter((q) => q.id !== deleted.id);
    setQuestions(updatedQuestions);
  }

  function handleAnswerChange(updatedQuestion){
    const updatedQuestions = questions.map((q) => {
      if (q.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return q;
      }
    });
    setQuestions(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul >
        {
        questions.map((q) => (
          <QuestionItem key={q.id} question={q} 
          onhandleDelete={handleDelete} 
          onhandleAnswerChange={handleAnswerChange} />
        ))}
        </ul>
    </section>
  );
}

export default QuestionList;
