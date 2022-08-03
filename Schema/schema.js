const {projects,clients} = require("../SampleData");
const {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLSchema, GraphQLList} = require("graphql");
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
               return Project.findById(args.id);

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
            return Client.findById(args.id);
        }
    }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
})

