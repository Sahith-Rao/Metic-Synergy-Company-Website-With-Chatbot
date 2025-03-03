const TeamMemberCard = ({ member }) => {
  return (
    <div className="glow-effect rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <img 
        src={member.image} 
        alt={member.name}
        className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold text-center text-glow">
        {member.name}
      </h3>
      {/* ... rest of the card content ... */}
    </div>
  );
}; 