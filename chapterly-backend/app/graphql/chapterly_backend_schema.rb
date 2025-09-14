class ChapterlyBackendSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end