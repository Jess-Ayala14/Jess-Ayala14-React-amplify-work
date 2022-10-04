import React, { useEffect} from 'react';
import { Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { createStore } from 'state-pool';

const store = createStore();
store.setState("analyticsFB", []);


export const Insights = (data) => {

    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = 'me/insights?metric=page_engaged_users,page_impressions,page_post_engagements,page_posts_impressions'
    const [analyticsFB, setAnalytics] = store.useState("analyticsFB");

    useEffect(() => {

        if (loginFB !== false) {
            allInsights();
        }

    }, []);

    /*
    // me/insights?metric=page_total_actions
    // me/insights/page_total_actions/day
    // me/insights/page_total_actions/days_28
    // me/insights/page_total_actions/week

    
        FB 20749883427147142074988342714714
        Inst 17841406287465765
        page_engaged_users
        page_post_engagements
        page_impressions
        page_posts_impressions

        me/insights?metric=page_engaged_users,page_impressions,page_post_engagements,page_posts_impressions

        17841406287465765/insights?metric=impressions,reach,profile_views&period=day

        me?fields=instagram_business_account{media{id,permalink}}
       
        post
        17894903435627997/insights?metric=engagement,impressions,reach

    */

    function allInsights() {
        window.FB.api(
            APICALLFB,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                getAnalyticsFB(response);
                setAnalytics(formatFB(getAnalyticsFB(response)))
            }

        );

        function getAnalyticsFB(response) {
            //console.log(response)
            const insight = response['data']
            return insight
        }

        function formatFB(insights) {

            const content = Object.keys(insights).map(key => {
                return (
                    [insights[key].name, insights[key].values, insights[key].title, insights[key].period, insights[key].description]
                );
            })

            return content
        }
    }

    function GetAnalyticsFB(props) {

        console.log(props);
        const FBinsights = props.analytics;
        const listItems = FBinsights.map((insight) =>
            <Row>
                <Col md={2} lg={3} />
                <Col md={3} lg={3}>
                    <br />
                    <Card style={{ width: '18rem' }}>
                        <Card.Title className='text-left'>{insight[0]}</Card.Title>
                        <Card.Body>
                            <Card.Text className='text-justify'>
                                <p>{insight[1][0].value}</p>
                                <br />
                                <p>{insight[1][1].value}</p>
                            </Card.Text>
                            <div className='text-center'>
                                <p>{insight[2]}</p>
                                <p>{insight[3]}</p>
                                <p>{insight[4]}</p>
                                <p>{insight[5]}</p>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2} lg={3} />
            </Row>
        );

        return (
            <ul>{listItems}</ul>
        );

    }


    return (
        <>
            {loginFB == true
                ?
                <Row>
                    <p>Here will be the Analytics</p>
                    <GetAnalyticsFB analytics={analyticsFB} />
                </Row>
                :
                <Row>
                    <Col className="center">
                        <br />
                        <Col md={2} lg={3} />
                        <Col md={3} lg={3}>
                            <br />
                            <Card className="inst" style={{ width: '18rem' }}>
                                <Card.Body className='text-center'>
                                    <Card.Text>
                                        Please Authorize Instagram
                                    </Card.Text>
                                    <Button href='/Settings' className="btn-instagram">Go to settings</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={2} lg={3} />
                    </Col>
                </Row>
            }
        </>
    );

}

export default Insights;