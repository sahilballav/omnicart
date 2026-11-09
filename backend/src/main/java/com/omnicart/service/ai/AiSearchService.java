package com.omnicart.service.ai;

import com.omnicart.dto.ai.AiSearchRequest;
import com.omnicart.dto.ai.AiSearchResponse;

public interface AiSearchService {

    AiSearchResponse searchByIntent(AiSearchRequest request);
}

