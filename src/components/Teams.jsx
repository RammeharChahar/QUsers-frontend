import React, { useEffect ,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import { addToTeam, removeFromTeam } from "../redux/slices/userSlice";
import axios from 'axios';

function Teams() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const team = useSelector((state) => state.team);
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    const extractedUserIds = team.map((user) => user.id);
    setUserIds(extractedUserIds);
  }, [team]); 

  console.log(team);

  const filterUsersByDomainAndAvailability = () => {
    const availableUsers = users.filter((user) => user.available === true);
    const uniqueDomains = [
      ...new Set(availableUsers.map((user) => user.domain)),
    ];
    const usersByDomain = {};

    uniqueDomains.forEach((domain) => {
      const domainUsers = availableUsers
        .filter((user) => user.domain === domain)
        .slice(0, 15);
      usersByDomain[domain] = domainUsers;
    });

    return usersByDomain;
  };

  const usersByDomain = filterUsersByDomainAndAvailability();
  const handleAddToTeam = (user) => {
    dispatch(addToTeam(user));
  };

  const createTeam = async (userIds) => {
    try {
      const response = await axios.post('https://server-test-1-5edc.onrender.com/api/team/', {
        userIds: userIds,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Team creation successful:', response.data);
      // Handle successful team creation
    } catch (error) {
      console.error('Error creating team:', error);
      // Handle error
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Users Grouped by Unique Domain and Availability
      </h1>
      {Object.entries(usersByDomain).map(([domain, domainUsers]) => (
        <div key={domain} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{domain}</h2>
          <div className="max-h-60 overflow-y-auto">
            <ul className="divide-y divide-gray-300">
              {domainUsers.map((user) => (
                <li key={user.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <p className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</p>
                        <p className="text-sm text-gray-500">{`${user.email} | ${user.gender}`}</p>
                        <p className="text-sm text-gray-500">{`Domain: ${user.domain}`}</p>
                        <p className="text-sm text-gray-500">{`Available: ${user.available}`}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToTeam(user)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to Team
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
        <ul className="divide-y divide-gray-300">
          {team?.map((member) => (
            <li key={member.id} className="py-4">
              <div className="flex items-center">
                <img
                  src={member.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full mr-4"
                />
                <p className="text-lg font-semibold">{`${member.first_name} ${member.last_name}`}</p>
                <button
                  onClick={() => dispatch(removeFromTeam(member.id))}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={() => createTeam(userIds)}  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Create Team
        </button>
      </div>
    </div>
  );
}

export default Teams;
