sp_SendMail = function (from, to, body, subject, importance, onSuccess, onError) {
	var urlTemplate = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.Utilities.Utility.SendEmail",
		formDigest = document.getElementById("__REQUESTDIGEST").value;

	$.ajax({
		contentType: 'application/json',
		url: urlTemplate,
		type: 'POST',
		data: JSON.stringify({
			'properties': {
				'__metadata': { 'type': 'SP.Utilities.EmailProperties' },
				'From': from,
				'To': { 'results': [to] },
				'Subject': subject,
				'Body': body,
				'AdditionalHeaders': {
					"__metadata":
					{
						"type": "Collection(SP.KeyValue)"
					},
					"results":
					[
						{
							"__metadata": {
								"type": 'SP.KeyValue'
							},
							"Key": "content-type",
							"Value": "text/html",
							"ValueType": "Edm.String"
						},
						{
							"__metadata": {
								"type": 'SP.KeyValue'
							},
							"Key": "Importance",
							"Value": importance || "Normal",
							"ValueType": "Edm.String"
						}
					]
				}
			}
		}
		),
		headers: {
			"Accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose",
			"X-RequestDigest": formDigest
		},
		success: function (data) {
			if (onSuccess) {
				onSuccess(data);
			}
		},
		error: function (err) {
			if (onError) {
				onError(err);
			}
		}
	});
};