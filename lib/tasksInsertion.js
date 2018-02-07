if (Meteor.isServer) {
    if (tasks.find().count() === 0) {
        tasks.insert({
            name: 'PROGRAMMING',
            skills: {
                creativity: 5,
                teamwork: 3,
                fitness: 1,
                discipline: 3,
                research: 2,
                logic: 1,
                leadership: 0,
                workEthic: 2
            },
            users: []
        });
        tasks.insert({
            name: 'READING',
            skills: {
                creativity: 3,
                teamwork: 0,
                fitness: 0,
                discipline: 3,
                research: 1,
                logic: 2,
                leadership: 0,
                workEthic: 3
            },
            users: []
        });
        tasks.insert({
            name: 'RUNNING',
            skills: {
                creativity: 1,
                teamwork: 0,
                fitness: 1,
                discipline: 3,
                research: 4,
                logic: 1,
                leadership: 0,
                workEthic: 4
            },
            users: []
        });
        tasks.insert({
            name: 'STUDYING',
            skills: {
                creativity: 3,
                teamwork: 4,
                fitness: 0,
                discipline: 2,
                research: 2,
                logic: 1,
                leadership: 0,
                workEthic: 3
            },
            users: []
        });
        tasks.insert({
            name: 'PLAYING TENNIS',
            skills: {
                creativity: 4,
                teamwork: 3,
                fitness: 1,
                discipline: 2,
                research: 3,
                logic: 4,
                leadership: 0,
                workEthic: 4
            },
            users: []
        });
    }
}

