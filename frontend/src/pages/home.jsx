const Home = () => {
  return (
    <div className="flex flex-col items-center pt-20">
      {/* TODO: Make the "Lunch Bill" scroll to multiple things like "Cab ride", "Trip cost", etc */}
      <h1 className="p-4">Sign In and invite your friends to split the Lunch bill!!</h1>

      <button className="border border-2 rounded-md p-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700">
        SignIn
      </button>
    </div>
  );
};

export default Home;
