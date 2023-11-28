import { SolutionResponseData, UserResponseData } from "./Types";

export const calulateNumberOfSolvedSolution = (solutions: SolutionResponseData[]) => {
    const solvedSolutions = solutions.filter(solution => solution.status === 'SOLVED');
    return solvedSolutions.length;
}

export const calculateNumberOfVolunteering = (user: UserResponseData) => {
    return user.pendingVolunteeredSolutions.length + user.volunteeredSolutions.length;
}