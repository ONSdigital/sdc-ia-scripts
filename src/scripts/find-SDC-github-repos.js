const { zipWith } = require("lodash");
const githubApi = require("../github/githubApi");

const githubPaginationLimit = "100";
const organization = "ONSDigital";

const query = `query { 
    organization(login:"${organization}") { 
        teams(first: ${githubPaginationLimit}) {
            nodes {
                name
                repositories(first: ${githubPaginationLimit}) {
                    nodes {
                        name,
                        isArchived
                    }
                    edges {
                        permission
                    }
                }
            }
        }
    }
}`;

const callback = data => {
  {
    const output = { teams: [] };

    data.organization.teams.nodes.forEach(team => {
      let teamData = {
        name: team.name,
        repositories: []
      };

      const nodes = team.repositories.nodes;
      const edges = team.repositories.edges;

      const reposData = zipWith(nodes, edges, (nodes, edges) => {
        return {
          name: nodes.name,
          permission: edges.permission,
          isArchived: nodes.isArchived
        };
      });

      teamData.repositories.push(reposData);

      output.teams.push(teamData);
    });

    return JSON.stringify(output, null, 2);
  }
};

githubApi(process.env.GITHUB_API_KEY, query).then(data => {
  // eslint-disable-next-line
  console.log(callback(data));
});
