import * as axios from 'axios'

class Backend {

    fetchAllSurveys = () => {
        return axios({
            method: 'GET',
            url: '/api/surveys'
        }).then(data => {
            return data.data
        }).catch(err => {
            console.log(err);
        });
    }

    postSurvey = (name, results, uid) => {
        return axios.post('/api/surveys/addSurvey',{
            uid: uid,
            survey: name,
            results: results
        }).catch(err => {
            console.log(err);
        });
    }

    fetchSurveyByName = (name) => {
        return axios({
            method: 'GET',
            url: '/api/surveys/name/'+name
        }).then(data => {
            return data.data
        }).catch(err => {
            console.log(err);
        });
    }
    fetchAllTemplates = () => {
        return axios({
            method: 'GET',
            url: '/api/template/'
        }).then(data => {
            return data.data
        }).catch(err => {
            console.log(err);
        });
    }
    fetchTemplate = (id) => {
        return axios({
            method: 'GET',
            url: '/api/template/'+id
        }).then(data => {
            return data.data
        }).catch(err => {
            console.log(err);
        });
    }
    fetchSr = (id) => {
        return axios({
            method: 'GET',
            url: '/api/template/'+id
        }).then(data => {
            return data.data
        }).catch(err => {
            console.log(err);
        });
    }
}

export default Backend
export const integratedBackend = new Backend()
