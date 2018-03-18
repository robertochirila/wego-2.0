import moment from "moment/moment";

if (Meteor.isServer) {
    if (projects.find().count() === 0) {
        console.log('projects insertion');
        let now = moment().format('MMM Do YY');
        let time = moment();
        let endTime = time.add(Number(12), 'hours').format('HH:mm:ss');
        projects.insert(
            {
                projectName: 'Manchester Marathon',
                projectDuration: 150,
                startedAt: now,
                expiresIn: endTime,
                people: 0,
                users: [],
                relevantTasks: ['RUNNING', 'TRAINING']
            }
        );
        projects.insert(
            {
                projectName: 'Hacking Course',
                projectDuration: 30,
                startedAt: now,
                expiresIn: endTime,
                people: 0,
                users: [],
                relevantTasks: ['PROGRAMMING']
            }
        );
        projects.insert(
            {
                projectName: 'Yoga',
                projectDuration: 40,
                startedAt: now,
                expiresIn: endTime,
                people: 0,
                users: [],
                relevantTasks: ['YOGA', 'MEDITATION']
            }
        );
    }
}