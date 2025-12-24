export const validateFilmContract = (text) => {
    text = text.toLowerCase();
  
    const validKeywords = [
      "agreement",
      "rights",
      "producer",
      "license",
      "film",
      "territory",
      "duration"
    ];
  
    const invalidKeywords = [
      "invoice",
      "gst",
      "total amount",
      "bill to"
    ];
  
    const hasValid = validKeywords.some(k => text.includes(k));
    const hasInvalid = invalidKeywords.some(k => text.includes(k));
  
    return hasValid && !hasInvalid;
  };
  