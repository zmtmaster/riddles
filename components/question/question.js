import React, { Suspense } from 'react';
import { Stack } from '@mobily/stacks';
import getQuestion, { QUESTION_NUMBER } from './questions-bank';

const Question = ({ onFail, onNext, onComplete, qIdx }) => {
  if (qIdx === QUESTION_NUMBER) {
    onComplete();
  }

  return (
    <Suspense fallback={null}>
      <Stack align="stretch" space={5}>
        {getQuestion(qIdx, onNext, onFail)}
      </Stack>
    </Suspense>
  );
};

export default Question;
