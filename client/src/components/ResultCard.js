import React from 'react'
import { Card, CardBody, CardHeader, CardHeading } from '../styles'

const ResultCard = ({result}) => {
  return (
    <Card>
        <CardHeader>
            <CardHeading>{result.title}</CardHeading>
        </CardHeader>
        <CardBody>
            <p>{result.author_name}</p>
            <p>{result.first_publish_year}</p>
            <p>{result.subject}</p>
        </CardBody>
    </Card>
  )
}

export default ResultCard