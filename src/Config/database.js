
const apiToken =  "";

async function FetchAllLibraries() {
  
  try {
      console.log("Buscando libraries")
      const res = await fetch(
          'https://graphql.datocms.com/',
          {
              method: 'POST',
              headers: {
                  'X-Api-Version': 3,
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                  query: `
                    query{
                      allLibraries { idssmv name address phone}
                    } `
               }),
          }
      )
      console.log("retornou")
      const data = await res.json()
      console.log("retornou")
      console.log(data.data)
      return data.data.allLibraries
  } catch (error) {
      console.log(error);
      return error
  }
}

async function PostLibrary(name, email, password, idDsssmv, address, phone){
  console.log("Salvando livrarias")
  try {
      const res = await fetch(
        'https://site-api.datocms.com/items',
          {
              method: 'POST',
              headers: {
                  'X-Api-Version': 3,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                  "data": {
                    "type": "item",
                    "attributes": {
                      "name": name,
                      "email": email,
                      "password": password,
                      "idssmv": idDsssmv,
                      "address" : address,
                      "phone": phone
                    },
                    "relationships": {
                      "item_type": {
                        "data": {
                          "type": "item_type",
                          "id": "923818"
                        }
                      }
                    }
                  }          
              }),
          }
      )
      const data = await res.json()
      console.log("Reposta do create:")
      console.log(data)
      console.log("id da consultda = " + data.data.id)
      return data.data.id

  } catch (error) {
      console.log(error);
      return error
  }
}

async function Put(id) {
  try {
      const res = await fetch(
          `https://site-api.datocms.com/items/${id}/publish?recursive=true`,
          {
              method: 'PUT',
              headers: {
                  'X-Api-Version': 3,
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
          }
      )
      const data = await res.json()

      
      return "Data successfully published"
      
  } catch (error) {
      console.log(error);
      return error
  }
}

async function PostUser(name, email, password, phone){
  console.log("Salvando usuarios")
  try {
      const res = await fetch(
        'https://site-api.datocms.com/items',
          {
              method: 'POST',
              headers: {
                  'X-Api-Version': 3,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                  "data": {
                    "type": "item",
                    "attributes": {
                      "email" : email,
                      "name" : name,
                      "password" : password,
                      "phone" : phone
                    },
                    "relationships": {
                      "item_type": {
                        "data": {
                          "type": "item_type",
                          "id": "924091"
                        }
                      }
                    }
                  }          
              }),
          }
      )
      const data = await res.json()
      console.log("Reposta do create:")
      console.log(data)
      console.log("id da consultda = " + data.data.id)
      return data.data.id

  } catch (error) {
      console.log(error);
      return error
  }
}

async function PostReservation(libraryId, bookId, bookTitle, userId, dueDate, checkOutDate){
  console.log("Salvando reservas")
  try {
      const res = await fetch(
        'https://site-api.datocms.com/items',
          {
              method: 'POST',
              headers: {
                  'X-Api-Version': 3,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                  "data": {
                    "type": "item",
                    "attributes": {
                      "libraryid" : libraryId,
                      "bookid" : bookId,
                      "booktitle" : bookTitle,
                      "user" : userId,
                      "duedate": dueDate,
                      "checkoutdate" : checkOutDate
                    },
                    "relationships": {
                      "item_type": {
                        "data": {
                          "type": "item_type",
                          "id": "1006447"
                        }
                      }
                    }
                  }          
              }),
          }
      )
      const data = await res.json()
      console.log("Reposta do create:")
      console.log(data)
      console.log("id da consultda = " + data.data.id)
      return data.data.id

  } catch (error) {
      console.log(error);
      return error
  }
}

async function FetchUserByEmail(userEmail) {
  console.log("email = " + userEmail)
  try {
      const res = await fetch(
          'https://graphql.datocms.com/',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                  query: `
                      query User ($email: String){
                        allUsers(filter: {email: {eq: $email}}) {
                          id
                          password
                          name
                        }
                      }         
                       `,
                    variables: {
                        email: userEmail,
                    },
              }),

          }
      )
      console.log("Retornou")
      const data = await res.json()
      console.log(data.data.allUsers)
      return data.data.allUsers
  } catch (error) {
      console.log(error);
      return error
  }
}

async function FetchLibraryByName(libraryName) {
  console.log("name = " + libraryName)
  try {
      const res = await fetch(
          'https://graphql.datocms.com/',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                  query: `
                    query Library  ($name: String) {
                      allLibraries(filter: {name: {eq: $name}}) {
                        idssmv
                        id
                        name
                        password
                      }
                    }    
                       `,
                    variables: {
                        name: libraryName
                    },
              }),

          }
      )
      console.log("Retornou")
      const data = await res.json()
      console.log(data.data.allLibraries)
      return data.data.allLibraries
  } catch (error) {
      console.log(error);
      return error
  }
}

async function FetchLibraryById(libraryId) {
  try {
      const res = await fetch(
          'https://graphql.datocms.com/',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                  query: `
                    query Library  ($id: ItemId) {
                      library(filter: {id: {eq: $id}}) {
                        email
                        address
                        name
                        phone
                      }
                    }    
                       `,
                    variables: {
                        id: libraryId
                    },
              }),

          }
      )
      console.log("Retornou")
      const data = await res.json()
      console.log(data.data.library)
      return data.data.library
  } catch (error) {
      console.log(error);
      return error
  }
}

async function FetchAllReservations(libraryIdssmv, status) {
      console.log("Buscando libraries")
      try {
        const res = await fetch(
            'https://graphql.datocms.com/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiToken}`,
                },
                body: JSON.stringify({
                    query: `
                        query Reservations ($libraryIdssmv: String, $status: BooleanType){
                          allReservations(filter: {libraryid: {eq: $libraryIdssmv}, returnstatus: {eq: $status}}) {
                            booktitle
                            duedate
                            checkoutdate
                            user {
                              name
                            }
                            id
                          }
                        }
                         `,
                      variables: {
                        libraryIdssmv: libraryIdssmv,
                        status: status
                      },
                }),
  
            }
        )
        console.log("Retornou")
        const data = await res.json()
        console.log(data)
        return data.data.allReservations
    } catch (error) {
        console.log(error);
        return error
    }
}

async function FetchReservationById(reservationId) {
  try {
    const res = await fetch(
        'https://graphql.datocms.com/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiToken}`,
            },
            body: JSON.stringify({
                query: `
                    query Reservation ($reservationId: ItemId){
                      reservation(filter: {id: {eq: $reservationId}}) {
                        booktitle
                        bookid
                        checkoutdate
                        duedate
                        user {
                          email
                          name
                          phone
                        }
                      }
                    }
                     `,
                  variables: {
                    reservationId: reservationId
                  },
            }),

        }
    )
    console.log("Retornou")
    const data = await res.json()
    console.log(data.data.reservation)
    return data.data.reservation
} catch (error) {
    console.log(error);
    return error
}
}

async function SetReservationReturnStatus(id, status) {
  try {
      const res = await fetch(
          `https://site-api.datocms.com/items/${id}`,
          {
              method: 'PUT',
              headers: {
                  'X-Api-Version': 3,
                  'Accept': 'application/json',
                  'Content-Type': 'application/vnd.api+json',
                  'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify({
                "data": {
                  "type": "item",
                  "id" : id,
                  "attributes": {
                    "returnstatus": status
                  },
                  "relationships": {
                    "item_type": {
                      "data": {
                        "type": "item_type",
                        "id": "1006447"
                      }
                    }
                  }
                }          
            }),
              
          }
      )
      const data = await res.json()
      console.log(data.data)
      return "Data successfully published"
      
  } catch (error) {
      console.log(error);
      return error
  }
}
async function deleteLibrary(idLibrary) {
  console.log("deletando")
  try {
      const res = await fetch(
          `https://site-api.datocms.com/items/${idLibrary}`,
          {
              method: 'DELETE',
              headers: {
                  'X-Api-Version': 3,
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${apiToken}`,
              },
          }
      )
      const data = await res.json()

      
      return "Item deleted successfully"
      
  } catch (error) {
      console.log(error);
      return error
  }
}


export {FetchAllLibraries, PostLibrary, Put, PostUser, FetchUserByEmail, FetchLibraryByName, PostReservation, FetchAllReservations, FetchReservationById, SetReservationReturnStatus,FetchLibraryById, deleteLibrary}
