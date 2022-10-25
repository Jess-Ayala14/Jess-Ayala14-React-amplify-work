/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness($owner: String) {
    onCreateBusiness(owner: $owner) {
      id
      name
      about
      phone
      address
      image
      website
      multiposts {
        items {
          id
          title
          fb_id
          inst_id
          twit_id
          createdAt
          updatedAt
          businessMultipostsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness($owner: String) {
    onUpdateBusiness(owner: $owner) {
      id
      name
      about
      phone
      address
      image
      website
      multiposts {
        items {
          id
          title
          fb_id
          inst_id
          twit_id
          createdAt
          updatedAt
          businessMultipostsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness($owner: String) {
    onDeleteBusiness(owner: $owner) {
      id
      name
      about
      phone
      address
      image
      website
      multiposts {
        items {
          id
          title
          fb_id
          inst_id
          twit_id
          createdAt
          updatedAt
          businessMultipostsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateMultiposts = /* GraphQL */ `
  subscription OnCreateMultiposts($owner: String) {
    onCreateMultiposts(owner: $owner) {
      id
      title
      fb_id
      inst_id
      twit_id
      createdAt
      updatedAt
      businessMultipostsId
      owner
    }
  }
`;
export const onUpdateMultiposts = /* GraphQL */ `
  subscription OnUpdateMultiposts($owner: String) {
    onUpdateMultiposts(owner: $owner) {
      id
      title
      fb_id
      inst_id
      twit_id
      createdAt
      updatedAt
      businessMultipostsId
      owner
    }
  }
`;
export const onDeleteMultiposts = /* GraphQL */ `
  subscription OnDeleteMultiposts($owner: String) {
    onDeleteMultiposts(owner: $owner) {
      id
      title
      fb_id
      inst_id
      twit_id
      createdAt
      updatedAt
      businessMultipostsId
      owner
    }
  }
`;
