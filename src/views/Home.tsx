import { useNavigate } from 'react-router-dom';
import { Text } from 'components';

export const Home = () => {
  const navigate = useNavigate();
  const startAffirmation = () =>
    navigate('page/how-to-use-these-confessions-effectively');
  return (
    <>
      <Text variant="h1" className="prose prose-slate dark:prose-invert ">
        Positive affirmations are more effective with objective truth.{' '}
        <em className="text-purple-800 dark:text-purple-300">
          Here's what God says about{' '}
          <span className="text-transparent bg-gradient-to-br from-[#4dcaff] via-[#9480ff] to-[#bd34fe] bg-clip-text">
            you
          </span>
          .
        </em>
      </Text>
      <button
        type="button"
        className="mt-8 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-6 py-3.5 text-center"
        onClick={startAffirmation}
      >
        Start affirming yourself now →
      </button>
    </>
  );
};
className = ' fill-violet-500';
