if (Meteor.isServer) {
    if (tasks.find().count() === 0) {
        tasks.insert({
            name: 'PROGRAMMING',
            skills: {
                creativity: 0.5,
                teamwork: 0.6,
                fitness: 0,
                discipline: 0.7,
                research: 0.5,
                logic: 0.7,
                leadership: 0,
                workEthic: 0.5
            },
            users: []
        });
        tasks.insert({
            name: 'READING',
            skills: {
                creativity: 0.3,
                teamwork: 0,
                fitness: 0,
                discipline: 0.8,
                research: 1,
                logic: 0.5,
                leadership: 0,
                workEthic: 0.6
            },
            users: []
        });
        tasks.insert({
            name: 'RUNNING',
            skills: {
                creativity: 0.2,
                teamwork: 0,
                fitness: 1,
                discipline: 0.7,
                research: 0.3,
                logic: 0.2,
                leadership: 0,
                workEthic: 0.7
            },
            users: []
        });
        tasks.insert({
            name: 'STUDYING',
            skills: {
                creativity: 0.7,
                teamwork: 0.3,
                fitness: 0,
                discipline: 0.8,
                research: 0.8,
                logic: 0.8,
                leadership: 0,
                workEthic: 0.7
            },
            users: []
        });
        tasks.insert({
            name: 'PLAYING TENNIS',
            skills: {
                creativity: 0.5,
                teamwork: 0.2,
                fitness: 1,
                discipline: 0.7,
                research: 0.2,
                logic: 0.7,
                leadership: 0,
                workEthic: 0.7
            },
            users: []
        });
    }
}

