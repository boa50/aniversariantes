const { gql } = require('apollo-server');

const typeDefs = gql`
    type Status {
        nome: String!
    }

    type Query {
        getStatus: Status!
        status2: String!
    }
`;

module.exports = typeDefs;