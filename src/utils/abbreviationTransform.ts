export const getFullAddressType = (type: string) => {
    switch (type) {
      case "av":
        return "avenue";
      case "st":
        return "street";
      case "ln":
        return "lane";
      case "dr":
        return "drive";
      case "pl":
        return "place";
      case "rd":
        return "road";
      case "ct":
        return "court";
      case "hwy":
        return "highway";
      case "pde":
        return "parade";
      case "sq":
        return "square";
      case "cl":
        return "close";
      case "cr":
        return "crescent";
      case "cct":
        return "circuit";
      case "jct":
        return "junction";
      default:
        return type;
    }
  };