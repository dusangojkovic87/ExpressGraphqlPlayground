const {projects,clients} = require("../SampleData");
const {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require("graphql");
const Project = require("../Models/project");
const Client = require("../Models/client");





const ProjectType = new GraphQLObjectType({
    name:"Project",
    fields:() =>(
    {
        id:{type:GraphQLID},
        clientid:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString}
    })
})


const ClientType = new GraphQLObjectType({
    name:"Client",
    fields:() =>(
        {
            id:{type:GraphQLID},
            name:{type:GraphQLString},
            email:{type:GraphQLString},
            phone:{type:GraphQLString},
        })
    
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find();
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               return Project.findById(args._id);

            }
        },
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find();
            }

        },
        client:{
        type:ClientType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            return Client.findById(args._id);
        }
    }
    }
});


//mutations 
const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addClient:{
            type:ClientType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                phone:{type:new GraphQLNonNull(GraphQLString)},

            },
            resolve(parent,args){
                const client = new Client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone

                });

                return client.save();

            }

        }
        
    }
})




module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})

